pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "kanupriya18/registration-app"
        DOCKER_CREDENTIALS_ID = "dockerhub-creds"
        HELM_RELEASE_NAME = "registration-release"
        HELM_CHART_NAME = "registration-chart"
        //KUBE_CONTEXT = "minikube"
        OPENSHIFT_HELM_RELEASE_NAME = "registration-green"
        OPENSHIFT_HELM_CHART_NAME = "chart-openshift"
        JIRA_SITE = "your-jira-site"
        JIRA_CREDENTIALS_ID = "jira-creds"
    }

    triggers {
        githubPush() // Triggered when PR is merged to main
    }

    options {
        skipDefaultCheckout()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_CREDENTIALS_ID) {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes with Helm') {
            steps {
                script {
                    sh """
                        helm upgrade --install ${HELM_RELEASE_NAME} ./${HELM_CHART_NAME} \
                        --set image.repository=${DOCKER_IMAGE} \
                        --set image.tag=${env.BUILD_NUMBER} \
                        --kubeconfig /home/ubuntu/.kube/config
                    """
                }
            }
        }
        stage('Deploy to Kubernetes (Blue)') {
            steps {
                script {
                    sh """
                       helm upgrade --install registration-release ./registration-chart \
                       --set image.repository=${DOCKER_IMAGE} \
                       --set image.tag=${env.BUILD_NUMBER} \
                       --kubeconfig /home/ubuntu/.kube/config
                    """
                   }
              }
        } 
        stage('Notify Slack') {
            steps {
                 script {
                     def message = "✅ Build #${env.BUILD_NUMBER} deployed successfully to Kubernetes!"
                     sh """
                        curl -X POST -H 'Content-type: application/json' \
                        --data '{"text": "${message}"}' \
                        https://hooks.slack.com/services/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
                    """
                  }
             }
       }
        /*stage('Deploy to OpenShift (Green)') {
            steps {
                script {
                    sh """
                       helm upgrade --install ${OPENSHIFT_HELM_RELEASE_NAME} ./${OPENSHIFT_HELM_CHART_NAME} \
                       --set image.repository=${DOCKER_IMAGE} \
                       --set image.tag=${env.BUILD_NUMBER} \
                       --kube-context openshift-sandbox \
                       --namespace green --create-namespace
                    """
                 }
             }
        }

        stage('Update Jira') {
            steps {
                jiraSendBuildInfo site: JIRA_SITE, buildNumber: env.BUILD_NUMBER
                jiraSendDeploymentInfo site: JIRA_SITE, environmentId: 'production', environmentName: 'Production', deploymentState: 'successful'
            }
        }*/
    } 
}
