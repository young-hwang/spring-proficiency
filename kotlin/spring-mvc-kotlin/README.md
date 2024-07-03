## Persistence with JPA

Entity Class 선언시 val property를 가지는 data class를 사용하지 않았다.
이유는 JPA가 불변 클래스나 데이터 클래에 의해 자동 생성되는 메소드와 함께 작동하도록 설계되지 않았기 때문이다.
다른 Spring Data 계열을 사용하고 있다면 대부분은 이러한 구조를 지원하도록 설계되어 있으므로 Spring Data Mongo DB, Spring Data JDBC등을 사용할 때는 data class User(val long: String... Spring Data JDBC등을 사용할 때는 data class User(val long: String... Spring Data JDBC등을 사용할 때는 data class User(val long: String... Spring Data JDBC등을 사용할 때는 data class User(val long: String...)와 같은 class를 사용하는 것이 좋다.

JPA(Java Persistance API)는 엔티티 클래스의 필드 값이 변경 될 수 있는 가변(mutable) 클래스를 기반으로 설계되었다.
이는 JPA가 내부적으로 엔티티 상태를 관리하고 변경 감지를 수행하기 위해 필요하다.
반면, 불변 클래스(immutable class)는 객체가 생성된 후 그 상태가 변경되지 않도록 설계된 클래스이다.
Kotlin의 data class는 주로 불변 클래스로 사용되며, val 프로퍼티로 정의 된 필드는 생성 후 변경할 수 없다.

```java
import javax.persistence.*;

@Entity
public class User {
}
```