package me.springdatarediscountminsketch.service;

public enum CountMinSketchCommand {
    INITBYDIM("CMS.INITBYDIM"),
    INITBYPROB("CMS.INITBYPROB"),
    INCRBY("CMS.INCRBY"),
    QUERY("CMS.QUERY"),
    MERGE("CMS.MERGE"),
    INFO("CMS.INFO");

    private final String command;

    CountMinSketchCommand(String command) {
        this.command = command;
    }

    public String getCommand() {
        return command;
    }
}
