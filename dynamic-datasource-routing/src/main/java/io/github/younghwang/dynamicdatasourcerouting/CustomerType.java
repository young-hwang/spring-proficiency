package io.github.younghwang.dynamicdatasourcerouting;

public enum CustomerType {
    MASTER("master", () -> "MASTER"), SLAVE("slave", () -> "SLAVE");

    private final DataSourceLookupKeyFunction lookupKeyFunction;
    private final String name;

    CustomerType(String name, DataSourceLookupKeyFunction lookupKeyFunction) {
        this.name = name;
        this.lookupKeyFunction = lookupKeyFunction;
    }

    public DataSourceLookupKeyFunction lookupKeyFunction() {
        return this.lookupKeyFunction;
    }

    public String getName() {
        return name;
    }
}
