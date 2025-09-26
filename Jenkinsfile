pipeline {
    agent any

    environment {
        JIRA_SITE = 'https://kanupriya18701-1758796370320.atlassian.net'
        JIRA_ISSUE_KEY = 'SCRUM-6'
    }

    stages {
        stage('Notify Jira') {
            steps {
                withCredentials([string(credentialsId: 'jira-credentials', variable: 'JIRA_API_TOKEN')]) {
                    script {
                        def comment = "Build #${env.BUILD_NUMBER} completed. Triggering Jira automation."
                        def jiraUrl = "${JIRA_SITE}/rest/api/3/issue/${JIRA_ISSUE_KEY}/comment"

                        def payload = """{
                          \"body\": \"${comment}\"
                        }"""

                        httpRequest(
                            httpMode: 'POST',
                            url: jiraUrl,
                            contentType: 'APPLICATION_JSON',
                            requestBody: payload,
                            customHeaders: [
                                [name: 'Authorization', value: "Bearer ${JIRA_API_TOKEN}"]
                            ]
                        )
                    }
                }
            }
        }
    }
}

