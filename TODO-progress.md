# TODO Progress Tracker

## Enrollment Validations

- [x] Modify admission controller to validate course duration before enrollment
- [x] Update batch assignment logic based on course duration
- [x] Add validation in NewAdmission component
- [x] Ensure students are assigned to correct year/semester based on course

## Reporting/Transcript System

- [x] Create MarkSheet model with course duration validation
- [x] Create TransferCertificate model (only after course completion)
- [x] Create AcademicReport model for progress tracking
- [x] Add report generation controllers
- [x] Update student panel with report viewing/downloading
- [x] Add admin controls for report generation

## Backend Changes

- [x] Update admissionController.js for enrollment validations
- [x] Create report generation endpoints
- [x] Add course duration checks in promotion logic

## Frontend Changes

- [x] Update NewAdmission component with validations
- [x] Add report viewing components in student panel
- [x] Update Reports component to include new report types

## Testing

- [ ] Test enrollment with different course durations
- [ ] Test report generation for different student statuses
- [ ] Verify batch assignments are correct
