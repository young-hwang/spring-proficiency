dependencyResolutionManagement {
    // Use Maven Central as the default repository (where Gradle will download dependencies) in all subprojects.
    @Suppress("UnstableApiUsage")
    repositories {
        mavenCentral()
    }
}

rootProject.name = "spring-proficiency"

include("spring-ai:ch01-spring-ai")
include("spring-ai:ch02-chat-model-api")
include("spring-ai:ch03-prompt")
