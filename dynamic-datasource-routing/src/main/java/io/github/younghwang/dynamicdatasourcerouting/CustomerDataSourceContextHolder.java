package io.github.younghwang.dynamicdatasourcerouting;

import org.springframework.util.Assert;

public class CustomerDataSourceContextHolder {
    private static final ThreadLocal<DataSourceLookupKeyFunction> contextHolder = new ThreadLocal<>();

    public static DataSourceLookupKeyFunction getContext() {
        return contextHolder.get();
    }

    public static void setContext(DataSourceLookupKeyFunction context) {
        Assert.notNull(context, "DataSourceLookupKey cannot be null");
        contextHolder.set(context);
    }

    public static void clearContext() {
        contextHolder.remove();
    }
}
