package io.github.younghwang.dynamicdatasourcerouting;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
@ConfigurationProperties(prefix = "server")
public class CustomerDataSourceProperties {
    private Map<String, CustomerDataSourceProperty> sources;

    public Map<String, CustomerDataSourceProperty> getSources() {
        return sources;
    }

    public void setSources(Map<String, CustomerDataSourceProperty> sources) {
        this.sources = sources;
    }

    public static class CustomerDataSourceProperty {
        private String host;
        private String port;
        private String user;
        private String password;

        public String getHost() {
            return host;
        }

        public void setHost(String host) {
            this.host = host;
        }

        public String getPort() {
            return port;
        }

        public void setPort(String port) {
            this.port = port;
        }

        public String getUser() {
            return user;
        }

        public void setUser(String user) {
            this.user = user;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
