package io.github.younghwang.dynamicdatasourcerouting;

import com.zaxxer.hikari.HikariDataSource;
import io.github.younghwang.dynamicdatasourcerouting.CustomerDataSourceProperties.CustomerDataSourceProperty;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

public class CustomerRoutingDataSourceFactory {
    private CustomerDataSourceProperties customerDataSourceProperties;
    private Map<Object, Object> dataSourceMap = new ConcurrentHashMap<>();
    private AbstractRoutingDataSource routingDataSource;

    public CustomerRoutingDataSourceFactory(CustomerDataSourceProperties customerDataSourceProperties) {
        this.customerDataSourceProperties = customerDataSourceProperties;
    }

    public DataSource createRoutingDataSource() {
        // RoutingDataSource 생성
        routingDataSource = new CustomerRoutingDataSource();

        // Master Data Source 생성 및 default Data Source 지정
        DataSource defaultDataSource = createDataSource(customerDataSourceProperties.getSources().get(CustomerType.MASTER));
        routingDataSource.setDefaultTargetDataSource(defaultDataSource);

        // Data Source Map 생성
        dataSourceMap.put("master", defaultDataSource);
        dataSourceMap.put("slave", createDataSource(customerDataSourceProperties.getSources().get(CustomerType.SLAVE)));

        // RoutingDataSource 에 Data Sources Set
        routingDataSource.setTargetDataSources(dataSourceMap);
        // afterPropertiesSet() 메소드 호출하여 targetDataSource -> resolvedDataSources
        routingDataSource.afterPropertiesSet();
        return routingDataSource;
    }

    /**
     * DataSource 생성
     *
     * @param info
     * @return
     */
    public DataSource createDataSource(CustomerDataSourceProperty info) {
        DataSourceProperties dataSourceProperties = new DataSourceProperties();
        dataSourceProperties.setUrl("jdbc:mysql://" + info.getHost() + ":" + info.getPort() + "?serverTimezone=Asia/Seoul");
        dataSourceProperties.setUsername(info.getUser());
        dataSourceProperties.setPassword(info.getPassword());
        dataSourceProperties.setDriverClassName("com.mysql.cj.jdbc.Driver");
        return dataSourceProperties.initializeDataSourceBuilder().type(HikariDataSource.class).build();
    }
}
