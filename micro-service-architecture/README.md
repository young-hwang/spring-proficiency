# Eureka

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




