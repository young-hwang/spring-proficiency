# Spring Cloud Eureka

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