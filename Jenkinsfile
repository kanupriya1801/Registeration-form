pipeline {
    agent any

    environment {
        JIRA_SITE = 'https://kanupriya18701-1758796370320.atlassian.net'
        JIRA_ISSUE_KEY = 'SCRUM-6'
        JIRA_EMAIL = 'kanupriya18701@gmail.com'
        JIRA_API_TOKEN = credentials('jira-credentials') // stored securely
    }

    stages {
        stage('Notify Jira') {
            steps {
                script {
                    def comment = "Build #${env.BUILD_NUMBER} completed. Triggering Jira automation."
                    def jiraUrl = "${env.JIRA_SITE}/rest/api/3/issue/${env.JIRA_ISSUE_KEY}/comment"

                    def payload = """
                    {
                      "body": "${comment}"
                    }
                    """

                    httpRequest(
                        httpMode: 'POST',
                        url: jiraUrl,
                        contentType: 'APPLICATION_JSON',
                        requestBody: payload,
                        customHeaders: [
                            [name: 'Authorization', value: "Basic ${JIRA_EMAIL}:${JIRA_API_TOKEN}"]
                        ]
                    )
                }
            }
        }
    }
}
