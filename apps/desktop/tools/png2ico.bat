@echo off

REM Convert PNG to ICO
REM Need ImageMagick installed

magick convert icon.png -background transparent -define icon:auto-resize=16,24,32,48,64,128,256,512 -compress zip icon.ico
