pipeline {
  agent any
  stages {
    stage('Develop') {
      parallel {
        stage('Develop') {
          steps {
            echo 'Dev'
          }
        }

        stage('Production') {
          steps {
            echo 'Production'
          }
        }

      }
    }

  }
}