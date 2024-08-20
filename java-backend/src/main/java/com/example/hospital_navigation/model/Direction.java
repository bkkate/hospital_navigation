package com.example.hospital_navigation.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Direction {
    @JsonProperty("start_point")
    private int startPoint;
    @JsonProperty("end_point")
    private int endPoint;
    private String instruction;

    public Direction() { }
    public Direction(int startPoint, int endPoint, String instruction) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.instruction = instruction;
    }

    public int getStartPoint() { return startPoint; }

    public int getEndPoint() { return endPoint; }

    public String getInstruction() { return instruction; }

    public void setStartPoint(int startPoint) { this.startPoint = startPoint; }

    public void setEndPoint(int endPoint) { this.endPoint = endPoint;}

    public void setInstruction(String instruction) {this.instruction = instruction;}
}
