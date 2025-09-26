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
    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run tests') {
            steps {
                sh 'npm test -- --watchAll=false'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'build/**', allowEmptyArchive: true
        }
    }
        }
    }

    post {
        success {
            echo "Build succeeded"
        }
        failure {
            echo "Build failed"
        }
    }
}
