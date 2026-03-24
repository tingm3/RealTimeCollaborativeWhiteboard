package com.mthree.realtime_whiteboard.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("note")
public class NoteShape extends ShapeEntity {
    private String type = "note";
    private double x;
    private double y;
    private int width;
    private int height;
    private String text;
    private double textOffsetX;
    private double textOffsetY;
    private String font;

    @Override
    public String getType() {
        return type;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public double getTextOffsetX() {
        return textOffsetX;
    }

    public void setTextOffsetX(double textOffsetX) {
        this.textOffsetX = textOffsetX;
    }

    public double getTextOffsetY() {
        return textOffsetY;
    }

    public void setTextOffsetY(double textOffsetY) {
        this.textOffsetY = textOffsetY;
    }

    public String getFont() {
        return font;
    }

    public void setFont(String font) {
        this.font = font;
    }

}
