$urls = @(
    'http://localhost:3000',
    'http://localhost:3000/about',
    'http://localhost:3000/courses',
    'http://localhost:3000/contact',
    'http://localhost:3000/login',
    'http://localhost:3000/eligibility',
    'http://localhost:3000/faculty',
    'http://localhost:3000/free-courses',
    'http://localhost:3000/computer-basics',
    'http://localhost:3000/english-speaking',
    'http://localhost:3000/digital-marketing',
    'http://localhost:3000/career-guidance',
    'http://localhost:3000/personality-development',
    'http://localhost:3000/ncc',
    'http://localhost:3000/scholarship',
    'http://localhost:3000/admissionprocess',
    'http://localhost:3000/admissionquery',
    'http://localhost:3000/admin/login',
    'http://localhost:3000/staff',
    'http://localhost:3000/student'
)

foreach ($url in $urls) {
    $path = [System.Uri]::new($url).AbsolutePath.TrimStart('/')
    if ($path -eq '') { $path = 'home' }
    $outputPath = "lighthouse-report-$path.html"
    Write-Host "Running Lighthouse for $url"
    & lighthouse $url --output html --output-path $outputPath --quiet
    Start-Sleep -Seconds 20
}
