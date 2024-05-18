# Spring Cloud Eureka

## Eureka Server

@EnableEurekaServer 어노테이션을 사용하여 Eureka Server를 구현할 수 있다.

## Eureka Client Instance ID 변경

vanilla netflix eureka instance는 host name과 동일한 id로 등록됩니다.(host 당 하나의 service)

Spring Cloud Eureka는 다음과 같이 정의된 합리적인 기본값을 제공한다.

```yaml
${spring.cloud.client.hostname}:${spring.application.name}:${spring.application.instance_id:${server.port}}

# myhost:myappname:8080
```

spring cloud를 사용하면 다음 예제와 같이 고유 식별자를 지정할 수 있다.

```yaml
eureka:
  instance:
    instanceId: ${spring.application.name}:${vcap.application.instance_id:${spring.application.instance_id:${random.value}}}
```

# Spring Cloud Gateway

## Gateway 설정

@EnableDiscoveryClient 마이크로서비스가 서비스 디스커버리 엔진에 등록되도록 만드는 역할을 합니다.

## Gateway Filter 추가

AbstractGatewayFilterFactory를 상속받아 구현한 GatewayFilter를 추가할 수 있다.

```java
@Component
public  class CustomFilter extends AbstractGatewayFilterFactory<CustomFilter.Config> {
    public CustomFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        // exchange: request/response를 처리하는 객체
        // chain: filter chain
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest().mutate()
                    .header("X-Custom-Header", "CustomValue")
                    .build();
            return chain.filter(exchange.mutate().request(request).build());
        };
    }

    public static class Config {
        // Put the configuration properties
    }
}
```

Filter를 설정을 다음과 같이 구현한다.

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: my_route
          uri: http://localhost:8080
          predicates:
            - Path=/my_route/**
          filters:
            - CustomFilter
```

# Spring Security

## 5.7 버전 이전

- Authentication - Authorization

1. 애플리케이션에 spring security jar을 dependency에 추가
2. WebSecurityConfigurerAdapter를 상속받는 SecurityConfig 클래스를 구현
3. Security Configuration 클래스에 @EnableWebSecurity 어노테이션을 추가
4. Authentication -> configure(AuthenticationManagerBuilder auth) 메소드를 재정의
5. Password encode를 위한 BCryptPasswordEncoder 빈 정의
6. Authorization -> configure(HttpSecurity http) 메소드를 재정의

## 5.7 버전 이후

1. spring-boot-starter-security dependency 추가
2. WebSecurityConfigureAdapter 없이 구성을 생성
3. Security Configuration 클래스에 @EnableWebSecurity 어노테이션을 추가
4. AuthenticationManager -> configure(AuthenticationManagerBuilder auth) 메소드를 재정의
5. Password encode를 위한 BCryptPasswordEncoder 빈 정의
6. SecurityFilterChain 빈을 정의하여 필터를 구성

## frameOptions

frameOptions은 웹 페이지를 \<frame>, \<iframe>, \<embed> 또는 \<object> 태그를 사용하여 다른 HTML 문서 안에 임베드하는 것을 제어하는 HTTP 헤더인 X-Frame-Options의 설정을 관리하는 메소드입니다.

이 설정은 클릭 잭킹(clickjacking) 공격을 방어하기 위해 사용됩니다.

클릭 잭킹은 공격자가 투명한 레이어를 추가하거나 다른 방식으로 사용자를 속여, 사용자가 의도한 것과는 다른 행동을 하게 만드는 공격 기법입니다.

frameOptions 설정에는 다음과 같은 옵션이 있습니다:

- DENY: 페이지가 어떠한 프레임에도 표시되지 않도록 합니다.
- SAMEORIGIN: 페이지를 동일한 출처에서 온 프레임에만 표시하도록 합니다.
- ALLOW-FROM uri: 페이지를 지정된 출처의 프레임에만 표시하도록 합니다.

```java
http.headers((headers) -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable));
```