package io.github.younghwang.dynamicdatasourcerouting;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

public class CustomerRoutingDataSource extends AbstractRoutingDataSource {
    // determineCurrentLookupKey의 구현
    @Override
    protected Object determineCurrentLookupKey() {
        return CustomerDataSourceContextHolder.getContext().getLookupKey();
    }
}
