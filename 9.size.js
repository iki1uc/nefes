Runtime = {
    mode: 3,   // 3 | 9 | 81 | ◎ | △ | 27
    ...
}

cycle() {
    if (mode === 3) { ...; mode = ◎; }
    if (mode === ◎) { mode = 9; }
    if (mode === 9) { ...; mode = △; }
    if (mode === △) { mode = 81; }
    if (mode === 81) { ...; mode = 27; }
    if (mode === 27) { mode = 3; }
}
