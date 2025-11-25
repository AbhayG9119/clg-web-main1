import Notification from '../models/Notification.js';
import AuditLog from '../models/AuditLog.js';

// Send notification
export const sendNotification = async (req, res) => {
  try {
    const { recipientId, recipientRole, type, title, message, priority, relatedEntity, course, academicYear, semester, metadata } = req.body;

    const notification = new Notification({
      recipientId,
      recipientRole,
      type,
      title,
      message,
      priority,
      relatedEntity,
      course,
      academicYear,
      semester,
      metadata
    });

    await notification.save();

    // Log audit
    await AuditLog.create({
      action: 'notification_sent',
      entityType: 'notification',
      entityId: notification._id,
      userId: req.user.id,
      userRole: req.user.role,
      details: { type, recipientId },
      newValues: notification.toObject(),
      course,
      academicYear,
      semester
    });

    res.status(201).json({
      message: 'Notification sent successfully',
      notification
    });
  } catch (error) {
    res.status(500).json({ message: 'Error sending notification', error: error.message });
  }
};

// Get my notifications (for authenticated user)
export const getMyNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.find({
      recipientId: userId,
      expiresAt: { $gt: new Date() }
    }).sort({ sentAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
};

// Get notifications for a specific user (admin view)
export const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ recipientId: userId }).sort({ sentAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
};

// Get all notifications (admin view)
export const getAllNotifications = async (req, res) => {
  try {
    const { type, status, course, academicYear, semester } = req.query;
    let query = {};

    if (type) query.type = type;
    if (status) query.status = status;
    if (course) query.course = course;
    if (academicYear) query.academicYear = academicYear;
    if (semester) query.semester = semester;

    const notifications = await Notification.find(query).sort({ sentAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { status: 'read', readAt: new Date() },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({
      message: 'Notification marked as read',
      notification
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification', error: error.message });
  }
};

// Delete notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting notification', error: error.message });
  }
};

// Send bulk notifications
export const sendBulkNotifications = async (req, res) => {
  try {
    const { recipientIds, recipientRole, type, title, message, priority, course, academicYear, semester } = req.body;

    const notifications = recipientIds.map(recipientId => ({
      recipientId,
      recipientRole,
      type,
      title,
      message,
      priority,
      course,
      academicYear,
      semester
    }));

    const createdNotifications = await Notification.insertMany(notifications);

    // Log audit
    await AuditLog.create({
      action: 'bulk_notification_sent',
      entityType: 'notification',
      entityId: null,
      userId: req.user.id,
      userRole: req.user.role,
      details: { type, count: recipientIds.length },
      newValues: { recipientIds, type, title },
      course,
      academicYear,
      semester
    });

    res.status(201).json({
      message: `Bulk notifications sent to ${recipientIds.length} recipients`,
      count: createdNotifications.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error sending bulk notifications', error: error.message });
  }
};

// Get notification statistics
export const getNotificationStats = async (req, res) => {
  try {
    const stats = await Notification.aggregate([
      {
        $group: {
          _id: { type: '$type', status: '$status' },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.type',
          statuses: {
            $push: {
              status: '$_id.status',
              count: '$count'
            }
          }
        }
      }
    ]);

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notification statistics', error: error.message });
  }
};
