## Persistence with JPA

Entity Class 선언시 val property를 가지는 data class를 사용하지 않았다.
이유는 JPA가 불변 클래스나 데이터 클래에 의해 자동 생성되는 메소드와 함께 작동하도록 설계되지 않았기 때문이다.
다른 Spring Data 계열을 사용하고 있다면 대부분은 이러한 구조를 지원하도록 설계되어 있으므로 Spring Data Mongo DB, Spring Data JDBC등을 사용할 때는 data class User(val long: String... Spring Data JDBC등을 사용할 때는 data class User(val long: String... Spring Data JDBC등을 사용할 때는 data class User(val long: String... Spring Data JDBC등을 사용할 때는 data class User(val long: String...)와 같은 class를 사용하는 것이 좋다.

JPA(Java Persistance API)는 엔티티 클래스의 필드 값이 변경 될 수 있는 가변(mutable) 클래스를 기반으로 설계되었다.
이는 JPA가 내부적으로 엔티티 상태를 관리하고 변경 감지를 수행하기 위해 필요하다.
반면, 불변 클래스(immutable class)는 객체가 생성된 후 그 상태가 변경되지 않도록 설계된 클래스이다.
Kotlin의 data class는 주로 불변 클래스로 사용되며, val 프로퍼티로 정의 된 필드는 생성 후 변경할 수 없다.

### 예시

가변 클래스를 사용하는 JPA 엔티티는 다음과 같이 정의 될 수 있다.

```java
import javax.persistence.*;
import java.lang.reflect.GenericArrayType;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String login;
    
    // 기본 생성자 필요
    public User() {}
    
    // 생성자
    public User(String login) {
        this.login = login;
    }
    
    // getter and setter
    public Long getId() {
        return id;
    }
    
    public String getLogin() {
        return login;
    }
    
    public void setLogin(String Login) {
        this.login = login;
    }
}
```

위의 java 클래스는 JPA entity로 사용된다.
중요한 점은 login 필드를 변경할 수 있는 setter 메소드가 제공된다는 것이다.
JPA는 이 Setter를 이용하여 데이터베이스로부터 엔티티를 로드할 때 필드를 설정하거나 entity의 상태를 바꿀 수 있다.

**kotlin의 불변 데이터 클래스와 JPA의 문제**

kotlin의 불변 데이터 클래스는 다음과 같이 정의될 수 있다.

```kotlin

```

