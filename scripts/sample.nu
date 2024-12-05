#!/usr/bin/env nu

def greet [name] {
  ["hello" $name]
}

def main [x: int] {
  let msg = greet "world"

  print $msg

  $x + 10
}