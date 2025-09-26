pipeline {
    agent { label 'docker-node' }

    triggers {
        // Optional: Use GitHub webhook instead of polling
        // pollSCM('* * * * *') 
    }

    options {
        skipDefaultCheckout(true)
    }

    stages {
        stage('Checkout') {
            when {
                branch pattern: "main|feature\\/SCRUM-\\d+", comparator: "REGEXP"
            }
            steps {
                checkout scm
                echo "Checked out branch: ${env.BRANCH_NAME}"
            }
        }

        stage('Build') {
            when {
                branch pattern: "main|feature\\/SCRUM-\\d+", comparator: "REGEXP"
            }
            steps {
                echo "Running build on docker-node..."
                // Add your actual build steps here
            }
        }

        stage('Test') {
            when {
                branch pattern: "main|feature\\/SCRUM-\\d+", comparator: "REGEXP"
            }
            steps {
                echo "Running tests..."
                // Add test steps here
            }
        }

        stage('Post Build Status to Jira') {
            when {
                branch pattern: "main|feature\\/SCRUM-\\d+", comparator: "REGEXP"
            }
            steps {
                echo "Posting build status to Jira for ${env.BRANCH_NAME}"
                // Use Jira plugin or REST API here
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
