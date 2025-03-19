plugins {
    id("org.springframework.boot") apply false
    id("io.spring.dependency-management") apply false
}

allprojects {
    group = "com.example"
    version = "1.0-SNAPSHOT"
}

subprojects {
    apply(plugin = "java")
    
    tasks.withType<JavaCompile> {
        sourceCompatibility = JavaVersion.VERSION_21.toString()
        targetCompatibility = JavaVersion.VERSION_21.toString()
    }

    tasks.withType<Test> {
        useJUnitPlatform()
    }
}
