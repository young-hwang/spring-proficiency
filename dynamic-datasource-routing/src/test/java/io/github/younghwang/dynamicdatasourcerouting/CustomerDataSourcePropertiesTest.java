package io.github.younghwang.dynamicdatasourcerouting;

import io.github.younghwang.dynamicdatasourcerouting.CustomerDataSourceProperties.CustomerDataSourceProperty;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class CustomerDataSourcePropertiesTest {

    @Autowired
    private CustomerDataSourceProperties dataSourceProperties;

    @Test
    void testGetResource() {
        // given
        // when
        // then
        assertThat(dataSourceProperties.getSources().size()).isEqualTo(2);
        CustomerDataSourceProperty master = dataSourceProperties.getSources().get("MASTER");
        assertThat(master.getHost()).isEqualTo("localhost");
        assertThat(master.getPort()).isEqualTo("3306");
        assertThat(master.getUser()).isEqualTo("root");
        assertThat(master.getPassword()).isEqualTo("passwd");

        CustomerDataSourceProperty slave = dataSourceProperties.getSources().get("SLAVE");
        assertThat(slave.getHost()).isEqualTo("localhost");
        assertThat(slave.getPort()).isEqualTo("4306");
        assertThat(slave.getUser()).isEqualTo("root");
        assertThat(slave.getPassword()).isEqualTo("passwd");
    }
}