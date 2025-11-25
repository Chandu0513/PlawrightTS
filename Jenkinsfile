pipeline {
    agent any

    environment {
        BROWSERS = "chromium"
        NODE_VERSION = "lts/*"
    }

    options {
        timeout(time: 60, unit: 'MINUTES')
    }

    stages {

        stage('Checkout Repository') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                bat 'node -v || echo Node not installed'
                bat 'npm -v || echo NPM not installed'
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat "npx playwright install %BROWSERS%"
            }
        }

        stage('Run Playwright tests') {
            steps {
                bat "npx playwright test --project=%BROWSERS% --reporter=line,html"
            }
        }
    }

    post {
        always {
            echo "Zipping Playwright Report..."

            bat '''
            if exist playwright-report (
                if not exist artifacts mkdir artifacts
                powershell Compress-Archive playwright-report artifacts\\playwright-report.zip -Force
            ) else (
                echo No playwright-report found
            )
            '''

            archiveArtifacts artifacts: 'artifacts/*.zip', fingerprint: true
            archiveArtifacts artifacts: 'test-results/**', fingerprint: true
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }

        success {
            echo "✅ Playwright Tests Passed"
        }

        failure {
            echo "❌ Playwright Tests Failed"
        }
    }
}
