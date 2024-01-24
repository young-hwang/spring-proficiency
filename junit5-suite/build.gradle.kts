plugins {
    id("java")
}

group = "me"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.9.1"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    // https://mvnrepository.com/artifact/org.junit.platform/junit-platform-suite-api
    testImplementation("org.junit.platform:junit-platform-suite-api:1.10.1")
}

tasks.test {
    useJUnitPlatform()
}