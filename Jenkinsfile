pipeline {
    agent any

    environment {
        CI = 'true'
        BASE_URL = 'https://rbihubcodechallenge.github.io/calculator/index.html'
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test --reporter=html,line'
            }
        }
    }

    post {
        always {
            publishHTML(target: [
                allowMissing         : false,
                alwaysLinkToLastBuild: true,
                keepAll              : true,
                reportDir            : 'playwright-report',
                reportFiles          : 'index.html',
                reportName           : 'Playwright Test Report'
            ])

            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }

        failure {
            echo 'Tests failed — check the Playwright HTML report for details.'
        }

        success {
            echo 'All Playwright tests passed.'
        }
    }
}
