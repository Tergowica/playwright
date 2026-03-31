$folders = @(
    "pages",
    "tests"
)

$files = @(
    "pages\BasePage.ts",
    "pages\LoginPage.ts",
    "pages\DashboardPage.ts",
    "pages\QuickTransferPage.ts",
    "pages\PhoneTopUpPage.ts",
    "pages\FinancialManagerPage.ts",
    "pages\PersonalAccountsPage.ts",
    "pages\PaymentsPage.ts",
    "pages\ReportsPage.ts",
    "pages\IframeReportsPage.ts",
    "pages\GenerateTransferPage.ts",
    "pages\ChartsPage.ts",
    "pages\SettingsPage.ts",
    "tests\bank.spec.ts"
)

foreach ($folder in $folders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder | Out-Null
    }
}

foreach ($file in $files) {
    if (-not (Test-Path $file)) {
        New-Item -ItemType File -Path $file | Out-Null
    }
}

Write-Host "Struktura utworzona."