# Simple Wordle solver

## Shows possible words given the current state of the board, ranked by word popularity.  

### Install

```bash
$ yarn install
```

### Run

```bash
$ yarn tsx src/solve.ts <black-letters> [yellow-positions]* [green-positions]*
```

- Black Letters are expressed simply as the list of known black letters:  e.g. 'plaegru' 
- Yellow positions are expresses as the letter, followed by a comma separated lst of *NEGATIVE* values of their positions:  e.g. 'l,-2,-5 a,-3'
- Green positions expressed as the letter, followed by its positions: e.g. 'v,4 a,2' 

### Notes

- All positions are 1 based
- The same letter can be expressed in a negative position and a positive position, just not in the same expression.  For example: 'a,-2 a,3' is correct.  'a,-2,3' is not.
- The same letter can be expressed multiple times in green positions.  e.g. 'o,2 o,3' 

### Examples

```bash
$ yarn tsx src/solve.ts spoifm l,-2,-5 a,-3 e,5 l,3 a,2 v,4 v,-1
$ yarn tsx src/solve.ts plaegru n,4, t,5
$ yarn tsx src/solve.ts spoifm l,-2,-5 a,-3 e,5 l,3 a,2
```

