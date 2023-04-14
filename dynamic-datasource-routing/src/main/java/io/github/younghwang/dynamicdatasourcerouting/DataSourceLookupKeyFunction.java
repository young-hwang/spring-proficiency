package io.github.younghwang.dynamicdatasourcerouting;

@FunctionalInterface
public interface DataSourceLookupKeyFunction {

    Object getLookupKey();

}
