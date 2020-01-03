pipeline {
    agent {
        docker {
            image '10.16.3-alpine'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'false'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run') {
            steps {
                sh 'sh ./jenkins/scripts/run.sh'
            }
        }
    }
}
