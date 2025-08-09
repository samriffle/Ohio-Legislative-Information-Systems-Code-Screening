# Code Screening

Welcome! This project is a Java application designed to be packaged as a runnable JAR with Maven.

---

## Prerequisites

To build and run this project, you need a Java Development Kit (JDK) installed on your machine, along with maven.

I recommend using the latest Eclipse Temurin JDK from [Adoptium](https://adoptium.net/temurin/releases).
I also recommend downloading the latest release from [Apache](https://maven.apache.org/download.cgi) for maven.

### How to install the JDK and Maven:

1. Visit: [https://adoptium.net/temurin/releases](https://adoptium.net/temurin/releases)
2. Download the latest JDK version for your operating system.
3. Run the installer and **make sure to check all optional features** during setup to get the full development environment.
4. After installation, verify it by opening a terminal/command prompt and running:

   ```bash
   java -version
   javac -version

5. Now visit [https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi).
6. Download the latest -bin.zip of apache maven for your operating system.
7. Extract the folder once installed and add its bin directory to your PATH environment variable.
8. Verify it by opening a terminal/command prompt and running:

   ```bash
   mvn -v
   
## Running the Application

1. To download and run the project, you will need to download this repository.

   ```bash
    git clone https://github.com/samriffle/Ohio-Legislative-Information-Systems-Code-Screening.git
    cd Ohio-Legislative-Information-Systems-Code-Screening
    git checkout master

3. Open your project workspace in your terminal/command prompt and build the project from root.

   ```bash
    mvn clean package

5. You may now run the project .jar:

   ```bash
    java -jar target/demo-0.0.1-SNAPSHOT.jar

4. You may test the project as it runs locally on http://localhost:8080/ in your browser.
5. Be sure to terminate the program in your task viewer after testing in your terminal with ctrl + c

