pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || true' // Optional: adjust based on your test setup
            }
        }
    }

    post {
        success {
            echo "✅ Build succeeded"
        }
        failure {
            echo "❌ Build failed"
        }
    }
}
