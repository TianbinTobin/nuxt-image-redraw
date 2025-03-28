import { ref } from 'vue';

interface DrawPath {
  points: [number, number][];
  type: PathType;
  lineWidth: number;
  lineCap: CanvasLineCap;
  lineJoin: CanvasLineJoin;
  strokeStyle: string | CanvasPattern | CanvasGradient;
}

type PathType = 'brush' | 'eraser' | 'drag';

const brushImageBase64 =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF8yMTEzXzM2OTA0KSI+CjxwYXRoIGQ9Ik02LjE4OTA4IDE5Ljk1MTRMOS4zMzQ0OSAxNC4xMUwxOC44NDYxIDQuNTk4MzFDMTkuMTQwNCA0LjMwNDA3IDE5LjYxNzQgNC4zMDQwNyAxOS45MTE3IDQuNTk4MzFMMjcuMjU2MSAxMS45NDI3QzI3LjU0NzkgMTIuMjM0NSAyNy41NTA3IDEyLjcwNjcgMjcuMjYyNCAxMy4wMDE5TDE3Ljg1NDggMjIuNjM2NEwxMi4wMTczIDI1Ljc3OTdDMTEuNzI0NCAyNS45Mzc0IDExLjM2MjYgMjUuODg0MyAxMS4xMjczIDI1LjY0OUw2LjMxOTcgMjAuODQxNEM2LjA4NDQzIDIwLjYwNjEgNi4wMzEzMyAyMC4yNDQ0IDYuMTg5MDggMTkuOTUxNFoiIGZpbGw9ImJsYWNrIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEuNTA2OSIvPgo8cGF0aCBkPSJNNS4yMzkzOCAyNC44NDg3TDYuODI5NzcgMjEuMzQ5OUwxMC42MTk5IDI1LjE0TDcuMTIxMDMgMjYuNzMwNEM2LjU4MTc5IDI2Ljk3NTUgNS45NDcwNiAyNi44NjA0IDUuNTI4MjEgMjYuNDQxNkM1LjEwOTM3IDI2LjAyMjcgNC45OTQyNyAyNS4zODggNS4yMzkzOCAyNC44NDg3WiIgZmlsbD0iYmxhY2siIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41MDY5Ii8+CjxwYXRoIGQ9Ik05LjI1MzkxIDE0LjE4ODJMMTcuNzc4MiAyMi43MTI1TDE2LjcxMjcgMjMuNzc4MUw4LjE4ODM3IDE1LjI1MzhMOS4yNTM5MSAxNC4xODgyWiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kXzIxMTNfMzY5MDQiIHg9Ii0zIiB5PSItMiIgd2lkdGg9IjM4IiBoZWlnaHQ9IjM4IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHk9IjEiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMS41Ii8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjM1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3dfMjExM18zNjkwNCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvd18yMTEzXzM2OTA0IiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8L2RlZnM+Cjwvc3ZnPgo=';

const eraserImageBase64 =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9IkN1cnNvciAvICYjMjI5OyYjMTU1OyYjMTkwOyYjMjI5OyYjMTMzOyYjMTMxOyAvICYjMjMwOyYjMTY5OyYjMTYxOyYjMjMxOyYjMTU0OyYjMTc0OyYjMjMwOyYjMTQ3OyYjMTY2Oy0mIzIzMzsmIzE4NzsmIzE1MjsmIzIzMjsmIzE3NDsmIzE2NDsiIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2RfMTczOF85NTI1KSI+CjxwYXRoIGlkPSJSZWN0YW5nbGUgMzQ2OTQxMyIgZD0iTTEzLjc0ODYgMjQuNzkxMkw4LjA2MDYyIDE5LjE2NTVMMTguNjY1MyA4LjU2MDg4TDI0LjMyMjEgMTQuMjE3N0wxOC42NjUzIDE5Ljg3NDZMMTYuMzQ3IDIyLjE5MjhMMTMuNzQ4NiAyNC43OTEyWiIgZmlsbD0iYmxhY2siIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBpZD0iUmVjdGFuZ2xlIDM0Njk0MTQiIGQ9Ik0xMi4yNjk1IDE0Ljc5MzlMMTguMDkxNiAyMC42MTZMMTcuMzg0NSAyMS4zMjMxTDExLjU2MjQgMTUuNTAxMUwxMi4yNjk1IDE0Ljc5MzlaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2RfMTczOF85NTI1IiB4PSItMyIgeT0iLTIiIHdpZHRoPSIzOCIgaGVpZ2h0PSIzOCIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz4KPGZlT2Zmc2V0IGR5PSIxIi8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjEuNSIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4zNSAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzE3MzhfOTUyNSIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvd18xNzM4Xzk1MjUiIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg==';

const dragImageBase64 =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF8xNzM4Xzk1MzYpIj4KPG1hc2sgaWQ9InBhdGgtMS1vdXRzaWRlLTFfMTczOF85NTM2IiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSI2LjM3NSIgeT0iNyIgd2lkdGg9IjE3IiBoZWlnaHQ9IjE4IiBmaWxsPSJibGFjayI+CjxyZWN0IGZpbGw9IndoaXRlIiB4PSI2LjM3NSIgeT0iNyIgd2lkdGg9IjE3IiBoZWlnaHQ9IjE4Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMuOTQyNyA5LjAyODMyQzEzLjk0MjcgOC40NjA0MSAxNC40MDMxIDguMDAwMDIgMTQuOTcxIDhDMTQuOTcxIDggMTQuOTcxIDggMTQuOTcxMSA4QzE1LjUzOSA4LjAwMDAyIDE1Ljk5OTMgOC40NjA0MSAxNS45OTkzIDkuMDI4MzJWOS44NzIyNkwxNS45OTkzIDkuODgyMTNWMTUuOTk5OEgxNi45OTkzVjEwLjkwMzFIMTYuOTk5M1Y5Ljg3NTE1QzE3LjAwMzEgOS4zMjYwNSAxNy40NDk0IDguODgyMDkgMTcuOTk5NCA4Ljg4MjEzQzE4LjU1MTYgOC44ODIxNiAxOC45OTkzIDkuMzI5ODcgMTguOTk5MyA5Ljg4MjEzVjE1Ljk5OTlIMTkuOTk5M1YxNS44NTQ3SDE5Ljk5OTRWMTIuOTk5OEMxOS45OTk0IDEyLjQ1MzQgMjAuNDM3NiAxMi4wMDk0IDIwLjk4MTcgMTJIMjEuMDE2OUMyMS41NjExIDEyLjAwOTQgMjEuOTk5MyAxMi40NTM0IDIxLjk5OTMgMTIuOTk5OFYxOC4zMTE2QzIxLjk4ODQgMjEuNDU0OSAxOS40MzY5IDIzLjk5OTcgMTYuMjkxIDIzLjk5OTdIMTYuMDA2M0MxNC45NTU0IDIzLjk5OTcgMTMuOTM4NSAyMy42NzAzIDEzLjA5MzYgMjMuMDY4N0w3LjY1NzEyIDE3LjYzMjNDNy4zMTgyIDE3LjI5MzQgNy4yODAwNSAxNi43NTY4IDcuNTY3NjEgMTYuMzczM0M3Ljg5ODc1IDE1LjkzMTggOC41MzI1IDE1Ljg1ODIgOC45NTU5NyAxNi4yMTIyTDEwLjEwMzUgMTcuMTcxNVYxNy4xNzE5TDEwLjExNjEgMTcuMTgyTDEwLjIyMTYgMTcuMjcwMkwxMC4yMjMxIDE3LjI2ODVMMTAuOTk5NyAxNy44OTYyVjE3SDEwLjk5OTNWMTAuOTA3NUMxMC45OTkzIDEwLjM3MTggMTEuNDM1NiA5LjkzNTg3IDExLjk3MzEgOS45MzU4N0MxMi41MDgzIDkuOTM1ODcgMTIuOTQyNiAxMC4zNjk5IDEyLjk0MjUgMTAuOTAzMUgxMi45NDI3VjE1Ljk5OTlIMTMuOTQyN1Y5LjAyODMyWiIvPgo8L21hc2s+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMuOTQyNyA5LjAyODMyQzEzLjk0MjcgOC40NjA0MSAxNC40MDMxIDguMDAwMDIgMTQuOTcxIDhDMTQuOTcxIDggMTQuOTcxIDggMTQuOTcxMSA4QzE1LjUzOSA4LjAwMDAyIDE1Ljk5OTMgOC40NjA0MSAxNS45OTkzIDkuMDI4MzJWOS44NzIyNkwxNS45OTkzIDkuODgyMTNWMTUuOTk5OEgxNi45OTkzVjEwLjkwMzFIMTYuOTk5M1Y5Ljg3NTE1QzE3LjAwMzEgOS4zMjYwNSAxNy40NDk0IDguODgyMDkgMTcuOTk5NCA4Ljg4MjEzQzE4LjU1MTYgOC44ODIxNiAxOC45OTkzIDkuMzI5ODcgMTguOTk5MyA5Ljg4MjEzVjE1Ljk5OTlIMTkuOTk5M1YxNS44NTQ3SDE5Ljk5OTRWMTIuOTk5OEMxOS45OTk0IDEyLjQ1MzQgMjAuNDM3NiAxMi4wMDk0IDIwLjk4MTcgMTJIMjEuMDE2OUMyMS41NjExIDEyLjAwOTQgMjEuOTk5MyAxMi40NTM0IDIxLjk5OTMgMTIuOTk5OFYxOC4zMTE2QzIxLjk4ODQgMjEuNDU0OSAxOS40MzY5IDIzLjk5OTcgMTYuMjkxIDIzLjk5OTdIMTYuMDA2M0MxNC45NTU0IDIzLjk5OTcgMTMuOTM4NSAyMy42NzAzIDEzLjA5MzYgMjMuMDY4N0w3LjY1NzEyIDE3LjYzMjNDNy4zMTgyIDE3LjI5MzQgNy4yODAwNSAxNi43NTY4IDcuNTY3NjEgMTYuMzczM0M3Ljg5ODc1IDE1LjkzMTggOC41MzI1IDE1Ljg1ODIgOC45NTU5NyAxNi4yMTIyTDEwLjEwMzUgMTcuMTcxNVYxNy4xNzE5TDEwLjExNjEgMTcuMTgyTDEwLjIyMTYgMTcuMjcwMkwxMC4yMjMxIDE3LjI2ODVMMTAuOTk5NyAxNy44OTYyVjE3SDEwLjk5OTNWMTAuOTA3NUMxMC45OTkzIDEwLjM3MTggMTEuNDM1NiA5LjkzNTg3IDExLjk3MzEgOS45MzU4N0MxMi41MDgzIDkuOTM1ODcgMTIuOTQyNiAxMC4zNjk5IDEyLjk0MjUgMTAuOTAzMUgxMi45NDI3VjE1Ljk5OTlIMTMuOTQyN1Y5LjAyODMyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTE0Ljk3MSA4VjdIMTQuOTcwOUwxNC45NzEgOFpNMTQuOTcxMSA4TDE0Ljk3MTEgN0gxNC45NzExVjhaTTE1Ljk5OTMgOS44NzIyNkwxNi45OTkzIDkuODc0NjdWOS44NzIyNkgxNS45OTkzWk0xNS45OTkzIDkuODgyMTNMMTQuOTk5MyA5Ljg3OTcxVjkuODgyMTNIMTUuOTk5M1pNMTUuOTk5MyAxNS45OTk4SDE0Ljk5OTNWMTYuOTk5OEgxNS45OTkzVjE1Ljk5OThaTTE2Ljk5OTMgMTUuOTk5OFYxNi45OTk4SDE3Ljk5OTNWMTUuOTk5OEgxNi45OTkzWk0xNi45OTkzIDEwLjkwMzFWOS45MDMxMkgxNS45OTkzVjEwLjkwMzFIMTYuOTk5M1pNMTYuOTk5MyAxMC45MDMxVjExLjkwMzFIMTcuOTk5M1YxMC45MDMxSDE2Ljk5OTNaTTE2Ljk5OTMgOS44NzUxNUwxNS45OTkzIDkuODY4MzJWOS44NzUxNUgxNi45OTkzWk0xNy45OTk0IDguODgyMTNMMTcuOTk5MyA5Ljg4MjEzTDE3Ljk5OTQgOC44ODIxM1pNMTguOTk5MyAxNS45OTk5SDE3Ljk5OTNWMTYuOTk5OUgxOC45OTkzVjE1Ljk5OTlaTTE5Ljk5OTMgMTUuOTk5OVYxNi45OTk5SDIwLjk5OTNWMTUuOTk5OUgxOS45OTkzWk0xOS45OTkzIDE1Ljg1NDdWMTQuODU0N0gxOC45OTkzVjE1Ljg1NDdIMTkuOTk5M1pNMTkuOTk5NCAxNS44NTQ3VjE2Ljg1NDdIMjAuOTk5NFYxNS44NTQ3SDE5Ljk5OTRaTTIwLjk4MTcgMTJWMTFIMjAuOTczMUwyMC45NjQ1IDExLjAwMDFMMjAuOTgxNyAxMlpNMjEuMDE2OSAxMkwyMS4wMzQyIDExLjAwMDFMMjEuMDI1NiAxMUgyMS4wMTY5VjEyWk0yMS45OTkzIDE4LjMxMTZMMjIuOTk5MyAxOC4zMTUxVjE4LjMxMTZIMjEuOTk5M1pNMTMuMDkzNiAyMy4wNjg3TDEyLjM4NjUgMjMuNzc1OEwxMi40NDU1IDIzLjgzNDlMMTIuNTEzNiAyMy44ODMzTDEzLjA5MzYgMjMuMDY4N1pNNy42NTcxMiAxNy42MzIzTDguMzY0MjMgMTYuOTI1Mkg4LjM2NDIzTDcuNjU3MTIgMTcuNjMyM1pNNy41Njc2MSAxNi4zNzMzTDguMzY3NjUgMTYuOTczM0g4LjM2NzY1TDcuNTY3NjEgMTYuMzczM1pNOC45NTU5NyAxNi4yMTIyTDguMzE0NiAxNi45Nzk0SDguMzE0Nkw4Ljk1NTk3IDE2LjIxMjJaTTEwLjEwMzUgMTcuMTcxNUgxMS4xMDM1VjE2LjcwNDFMMTAuNzQ0OSAxNi40MDQzTDEwLjEwMzUgMTcuMTcxNVpNMTAuMTAzNSAxNy4xNzE5SDkuMTAzNTRWMTcuNjQ5NEw5LjQ3NDk1IDE3Ljk0OTZMMTAuMTAzNSAxNy4xNzE5Wk0xMC4xMTYxIDE3LjE4MkwxMC43NTc0IDE2LjQxNDhMMTAuNzUxMSAxNi40MDk1TDEwLjc0NDcgMTYuNDA0M0wxMC4xMTYxIDE3LjE4MlpNMTAuMjIxNiAxNy4yNzAyTDkuNTgwMjQgMTguMDM3NUwxMC4zNDc1IDE4LjY3ODhMMTAuOTg4OCAxNy45MTE2TDEwLjIyMTYgMTcuMjcwMlpNMTAuMjIzMSAxNy4yNjg1TDEwLjg1MTcgMTYuNDkwN0wxMC4wODY3IDE1Ljg3MjVMOS40NTU4NSAxNi42MjcxTDEwLjIyMzEgMTcuMjY4NVpNMTAuOTk5NyAxNy44OTYyTDEwLjM3MTIgMTguNjczOUwxMS45OTk3IDE5Ljk5MDJWMTcuODk2MkgxMC45OTk3Wk0xMC45OTk3IDE3SDExLjk5OTdWMTZIMTAuOTk5N1YxN1pNMTAuOTk5MyAxN0g5Ljk5OTMzVjE4SDEwLjk5OTNWMTdaTTEyLjk0MjUgMTAuOTAzMUwxMS45NDI1IDEwLjkwMzFMMTEuOTQyNSAxMS45MDMxSDEyLjk0MjVWMTAuOTAzMVpNMTIuOTQyNyAxMC45MDMxSDEzLjk0MjdWOS45MDMwOUgxMi45NDI3VjEwLjkwMzFaTTEyLjk0MjcgMTUuOTk5OUgxMS45NDI3VjE2Ljk5OTlIMTIuOTQyN1YxNS45OTk5Wk0xMy45NDI3IDE1Ljk5OTlWMTYuOTk5OUgxNC45NDI3VjE1Ljk5OTlIMTMuOTQyN1pNMTQuOTcwOSA3QzEzLjg1MDggNy4wMDAwNCAxMi45NDI3IDcuOTA4MTQgMTIuOTQyNyA5LjAyODMySDE0Ljk0MjdDMTQuOTQyNyA5LjAyMjU3IDE0Ljk0MzcgOS4wMTk2IDE0Ljk0NDUgOS4wMTc2QzE0Ljk0NTYgOS4wMTQ5NCAxNC45NDc3IDkuMDExNTggMTQuOTUxIDkuMDA4M0MxNC45NTQzIDkuMDA1MDEgMTQuOTU3NiA5LjAwMjk0IDE0Ljk2MDMgOS4wMDE4MkMxNC45NjIzIDkuMDAwOTcgMTQuOTY1MyA5IDE0Ljk3MSA5TDE0Ljk3MDkgN1pNMTQuOTcxMSA3SDE0Ljk3MTFIMTQuOTcxMUgxNC45NzExSDE0Ljk3MTFDMTQuOTcxMSA3IDE0Ljk3MTEgNyAxNC45NzExIDdDMTQuOTcxMSA3IDE0Ljk3MTEgNyAxNC45NzExIDdDMTQuOTcxMSA3IDE0Ljk3MTEgNyAxNC45NzExIDdDMTQuOTcxMSA3IDE0Ljk3MTEgNyAxNC45NzExIDdDMTQuOTcxMSA3IDE0Ljk3MTEgNyAxNC45NzExIDdDMTQuOTcxMSA3IDE0Ljk3MTEgNyAxNC45NzExIDdIMTQuOTcxMUgxNC45NzExSDE0Ljk3MTFDMTQuOTcxMSA3IDE0Ljk3MTEgNyAxNC45NzExIDdDMTQuOTcxMSA3IDE0Ljk3MTEgNyAxNC45NzExIDdDMTQuOTcxMSA3IDE0Ljk3MTEgNyAxNC45NzExIDdDMTQuOTcxMSA3IDE0Ljk3MTEgNyAxNC45NzExIDdDMTQuOTcxMSA3IDE0Ljk3MTEgNyAxNC45NzExIDdDMTQuOTcxMSA3IDE0Ljk3MTEgNyAxNC45NzExIDdDMTQuOTcxMSA3IDE0Ljk3MTEgNyAxNC45NzExIDdIMTQuOTcxMUgxNC45NzExSDE0Ljk3MTFIMTQuOTcxMUMxNC45NzExIDcgMTQuOTcxMSA3IDE0Ljk3MTEgN0MxNC45NzExIDcgMTQuOTcxMSA3IDE0Ljk3MTEgN0MxNC45NzExIDcgMTQuOTcxMSA3IDE0Ljk3MTEgN0MxNC45NzExIDcgMTQuOTcxMSA3IDE0Ljk3MTEgN0MxNC45NzExIDcgMTQuOTcxMSA3IDE0Ljk3MTEgN0MxNC45NzExIDcgMTQuOTcxMSA3IDE0Ljk3MTEgN0MxNC45NzExIDcgMTQuOTcxMSA3IDE0Ljk3MTEgN0gxNC45NzExSDE0Ljk3MTFIMTQuOTcxMUMxNC45NzExIDcgMTQuOTcxMSA3IDE0Ljk3MTEgN0MxNC45NzExIDcgMTQuOTcxMSA3IDE0Ljk3MTEgN0MxNC45NzExIDcgMTQuOTcxMSA3IDE0Ljk3MTEgN0MxNC45NzExIDcgMTQuOTcxMSA3IDE0Ljk3MTEgN0MxNC45NzExIDcgMTQuOTcxMSA3IDE0Ljk3MTEgN0MxNC45NzExIDcgMTQuOTcxMSA3IDE0Ljk3MTEgN0MxNC45NzExIDcgMTQuOTcxMSA3IDE0Ljk3MTEgN0gxNC45NzExSDE0Ljk3MUgxNC45NzFIMTQuOTcxQzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3QzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3QzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3QzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3QzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3QzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3QzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3QzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3SDE0Ljk3MUgxNC45NzFIMTQuOTcxSDE0Ljk3MUMxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0gxNC45NzFIMTQuOTcxSDE0Ljk3MUMxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0gxNC45NzFIMTQuOTcxSDE0Ljk3MUgxNC45NzFIMTQuOTcxQzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3QzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3QzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3QzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3QzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3QzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3QzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3QzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3SDE0Ljk3MUgxNC45NzFIMTQuOTcxSDE0Ljk3MUMxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0gxNC45NzFIMTQuOTcxSDE0Ljk3MUgxNC45NzFDMTQuOTcxIDcgMTQuOTcxIDcgMTQuOTcxIDdDMTQuOTcxIDcgMTQuOTcxIDcgMTQuOTcxIDdDMTQuOTcxIDcgMTQuOTcxIDcgMTQuOTcxIDdDMTQuOTcxIDcgMTQuOTcxIDcgMTQuOTcxIDdDMTQuOTcxIDcgMTQuOTcxIDcgMTQuOTcxIDdDMTQuOTcxIDcgMTQuOTcxIDcgMTQuOTcxIDdDMTQuOTcxIDcgMTQuOTcxIDcgMTQuOTcxIDdDMTQuOTcxIDcgMTQuOTcxIDcgMTQuOTcxIDdIMTQuOTcxSDE0Ljk3MUgxNC45NzFIMTQuOTcxQzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3QzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3QzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3QzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3QzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3QzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3QzE0Ljk3MSA3IDE0Ljk3MSA3IDE0Ljk3MSA3SDE0Ljk3MUgxNC45NzFIMTQuOTcxSDE0Ljk3MUMxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0gxNC45NzFIMTQuOTcxSDE0Ljk3MUMxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0gxNC45NzFIMTQuOTcxSDE0Ljk3MUMxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0gxNC45NzFIMTQuOTcxSDE0Ljk3MUMxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0gxNC45NzFIMTQuOTcxSDE0Ljk3MUMxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN0MxNC45NzEgNyAxNC45NzEgNyAxNC45NzEgN1Y5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5SDE0Ljk3MUgxNC45NzFIMTQuOTcxQzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5SDE0Ljk3MUgxNC45NzFIMTQuOTcxQzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5SDE0Ljk3MUgxNC45NzFIMTQuOTcxQzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5SDE0Ljk3MUgxNC45NzFIMTQuOTcxQzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5SDE0Ljk3MUgxNC45NzFIMTQuOTcxSDE0Ljk3MUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUgxNC45NzFIMTQuOTcxSDE0Ljk3MUgxNC45NzFDMTQuOTcxIDkgMTQuOTcxIDkgMTQuOTcxIDlDMTQuOTcxIDkgMTQuOTcxIDkgMTQuOTcxIDlDMTQuOTcxIDkgMTQuOTcxIDkgMTQuOTcxIDlDMTQuOTcxIDkgMTQuOTcxIDkgMTQuOTcxIDlDMTQuOTcxIDkgMTQuOTcxIDkgMTQuOTcxIDlDMTQuOTcxIDkgMTQuOTcxIDkgMTQuOTcxIDlDMTQuOTcxIDkgMTQuOTcxIDkgMTQuOTcxIDlDMTQuOTcxIDkgMTQuOTcxIDkgMTQuOTcxIDlIMTQuOTcxSDE0Ljk3MUgxNC45NzFIMTQuOTcxQzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5SDE0Ljk3MUgxNC45NzFIMTQuOTcxSDE0Ljk3MUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUgxNC45NzFIMTQuOTcxSDE0Ljk3MUgxNC45NzFIMTQuOTcxQzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5SDE0Ljk3MUgxNC45NzFIMTQuOTcxQzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5QzE0Ljk3MSA5IDE0Ljk3MSA5IDE0Ljk3MSA5SDE0Ljk3MUgxNC45NzFIMTQuOTcxSDE0Ljk3MUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUMxNC45NzEgOSAxNC45NzEgOSAxNC45NzEgOUgxNC45NzFIMTQuOTcxSDE0Ljk3MTFIMTQuOTcxMUMxNC45NzExIDkgMTQuOTcxMSA5IDE0Ljk3MTEgOUMxNC45NzExIDkgMTQuOTcxMSA5IDE0Ljk3MTEgOUMxNC45NzExIDkgMTQuOTcxMSA5IDE0Ljk3MTEgOUMxNC45NzExIDkgMTQuOTcxMSA5IDE0Ljk3MTEgOUMxNC45NzExIDkgMTQuOTcxMSA5IDE0Ljk3MTEgOUMxNC45NzExIDkgMTQuOTcxMSA5IDE0Ljk3MTEgOUMxNC45NzExIDkgMTQuOTcxMSA5IDE0Ljk3MTEgOUgxNC45NzExSDE0Ljk3MTFIMTQuOTcxMUMxNC45NzExIDkgMTQuOTcxMSA5IDE0Ljk3MTEgOUMxNC45NzExIDkgMTQuOTcxMSA5IDE0Ljk3MTEgOUMxNC45NzExIDkgMTQuOTcxMSA5IDE0Ljk3MTEgOUMxNC45NzExIDkgMTQuOTcxMSA5IDE0Ljk3MTEgOUMxNC45NzExIDkgMTQuOTcxMSA5IDE0Ljk3MTEgOUMxNC45NzExIDkgMTQuOTcxMSA5IDE0Ljk3MTEgOUMxNC45NzExIDkgMTQuOTcxMSA5IDE0Ljk3MTEgOUgxNC45NzExSDE0Ljk3MTFIMTQuOTcxMUgxNC45NzExQzE0Ljk3MTEgOSAxNC45NzExIDkgMTQuOTcxMSA5QzE0Ljk3MTEgOSAxNC45NzExIDkgMTQuOTcxMSA5QzE0Ljk3MTEgOSAxNC45NzExIDkgMTQuOTcxMSA5QzE0Ljk3MTEgOSAxNC45NzExIDkgMTQuOTcxMSA5QzE0Ljk3MTEgOSAxNC45NzExIDkgMTQuOTcxMSA5QzE0Ljk3MTEgOSAxNC45NzExIDkgMTQuOTcxMSA5QzE0Ljk3MTEgOSAxNC45NzExIDkgMTQuOTcxMSA5SDE0Ljk3MTFIMTQuOTcxMUgxNC45NzExQzE0Ljk3MTEgOSAxNC45NzExIDkgMTQuOTcxMSA5QzE0Ljk3MTEgOSAxNC45NzExIDkgMTQuOTcxMSA5QzE0Ljk3MTEgOSAxNC45NzExIDkgMTQuOTcxMSA5QzE0Ljk3MTEgOSAxNC45NzExIDkgMTQuOTcxMSA5QzE0Ljk3MTEgOSAxNC45NzExIDkgMTQuOTcxMSA5QzE0Ljk3MTEgOSAxNC45NzExIDkgMTQuOTcxMSA5SDE0Ljk3MTFIMTQuOTcxMUgxNC45NzExSDE0Ljk3MTFWN1pNMTYuOTk5MyA5LjAyODMyQzE2Ljk5OTMgNy45MDgxMyAxNi4wOTEzIDcuMDAwMDQgMTQuOTcxMSA3TDE0Ljk3MSA5QzE0Ljk3NjggOSAxNC45Nzk3IDkuMDAwOTcgMTQuOTgxNyA5LjAwMTgyQzE0Ljk4NDQgOS4wMDI5NCAxNC45ODc4IDkuMDA1MDEgMTQuOTkxMSA5LjAwODNDMTQuOTk0MyA5LjAxMTU4IDE0Ljk5NjQgOS4wMTQ5NCAxNC45OTc1IDkuMDE3NkMxNC45OTg0IDkuMDE5NiAxNC45OTkzIDkuMDIyNTcgMTQuOTk5MyA5LjAyODMySDE2Ljk5OTNaTTE2Ljk5OTMgOS44NzIyNlY5LjAyODMySDE0Ljk5OTNWOS44NzIyNkgxNi45OTkzWk0xNi45OTkzIDkuODg0NTRMMTYuOTk5MyA5Ljg3NDY3TDE0Ljk5OTQgOS44Njk4NEwxNC45OTkzIDkuODc5NzFMMTYuOTk5MyA5Ljg4NDU0Wk0xNi45OTkzIDE1Ljk5OThWOS44ODIxM0gxNC45OTkzVjE1Ljk5OThIMTYuOTk5M1pNMTYuOTk5MyAxNC45OTk4SDE1Ljk5OTNWMTYuOTk5OEgxNi45OTkzVjE0Ljk5OThaTTE1Ljk5OTMgMTAuOTAzMVYxNS45OTk4SDE3Ljk5OTNWMTAuOTAzMUgxNS45OTkzWk0xNi45OTkzIDkuOTAzMTJIMTYuOTk5M1YxMS45MDMxSDE2Ljk5OTNWOS45MDMxMlpNMTUuOTk5MyA5Ljg3NTE1VjEwLjkwMzFIMTcuOTk5M1Y5Ljg3NTE1SDE1Ljk5OTNaTTE3Ljk5OTQgNy44ODIxM0MxNi44OTk0IDcuODgyMDYgMTYuMDA2OSA4Ljc2OTk3IDE1Ljk5OTQgOS44NjgzMkwxNy45OTkzIDkuODgxOThMMTcuOTk5MyA5Ljg4MjEzTDE3Ljk5OTQgNy44ODIxM1pNMTkuOTk5MyA5Ljg4MjEzQzE5Ljk5OTMgOC43Nzc2MSAxOS4xMDQgNy44ODIyIDE3Ljk5OTQgNy44ODIxM0wxNy45OTkzIDkuODgyMTNWOS44ODIxM0gxOS45OTkzWk0xOS45OTkzIDE1Ljk5OTlWOS44ODIxM0gxNy45OTkzVjE1Ljk5OTlIMTkuOTk5M1pNMTkuOTk5MyAxNC45OTk5SDE4Ljk5OTNWMTYuOTk5OUgxOS45OTkzVjE0Ljk5OTlaTTE4Ljk5OTMgMTUuODU0N1YxNS45OTk5SDIwLjk5OTNWMTUuODU0N0gxOC45OTkzWk0xOS45OTk0IDE0Ljg1NDdIMTkuOTk5M1YxNi44NTQ3SDE5Ljk5OTRWMTQuODU0N1pNMTguOTk5NCAxMi45OTk4VjE1Ljg1NDdIMjAuOTk5NFYxMi45OTk4SDE4Ljk5OTRaTTIwLjk2NDUgMTEuMDAwMUMxOS44NzU4IDExLjAxODkgMTguOTk5NCAxMS45MDY5IDE4Ljk5OTQgMTIuOTk5OEgyMC45OTk0TDIwLjk5OSAxMi45OTk5TDIwLjk2NDUgMTEuMDAwMVpNMjAuOTgxNyAxM0gyMS4wMTY5VjExSDIwLjk4MTdWMTNaTTIyLjk5OTMgMTIuOTk5OEMyMi45OTkzIDExLjkwNjkgMjIuMTIyOSAxMS4wMTg5IDIxLjAzNDIgMTEuMDAwMUwyMC45OTk3IDEyLjk5OTlMMjAuOTk5MyAxMi45OTk4SDIyLjk5OTNaTTIyLjk5OTMgMTguMzExNlYxMi45OTk4SDIwLjk5OTNWMTguMzExNkgyMi45OTkzWk0xNi4yOTEgMjQuOTk5N0MxOS45ODggMjQuOTk5NyAyMi45ODY1IDIyLjAwOTIgMjIuOTk5MyAxOC4zMTUxTDIwLjk5OTMgMTguMzA4MkMyMC45OTAzIDIwLjkwMDcgMTguODg1OCAyMi45OTk3IDE2LjI5MSAyMi45OTk3VjI0Ljk5OTdaTTE2LjAwNjMgMjQuOTk5N0gxNi4yOTFWMjIuOTk5N0gxNi4wMDYzVjI0Ljk5OTdaTTEyLjUxMzYgMjMuODgzM0MxMy41MjY3IDI0LjYwNDcgMTQuNzQ2MSAyNC45OTk3IDE2LjAwNjMgMjQuOTk5N1YyMi45OTk3QzE1LjE2NDcgMjIuOTk5NyAxNC4zNTAzIDIyLjczNTkgMTMuNjczNiAyMi4yNTQxTDEyLjUxMzYgMjMuODgzM1pNNi45NTAwMiAxOC4zMzk0TDEyLjM4NjUgMjMuNzc1OEwxMy44MDA3IDIyLjM2MTZMOC4zNjQyMyAxNi45MjUyTDYuOTUwMDIgMTguMzM5NFpNNi43Njc1NyAxNS43NzM0QzYuMTgxNDYgMTYuNTU1IDYuMjU5MjIgMTcuNjQ4NiA2Ljk1MDAyIDE4LjMzOTRMOC4zNjQyMyAxNi45MjUyQzguMzc3MTggMTYuOTM4MSA4LjM3ODY0IDE2Ljk1ODYgOC4zNjc2NSAxNi45NzMzTDYuNzY3NTcgMTUuNzczNFpNOS41OTczNSAxNS40NDVDOC43MzQyMiAxNC43MjM0IDcuNDQyNSAxNC44NzM0IDYuNzY3NTcgMTUuNzczNEw4LjM2NzY1IDE2Ljk3MzNDOC4zNjU3OSAxNi45NzU4IDguMzYxNTQgMTYuOTc5OSA4LjM1NTY5IDE2Ljk4MzJDOC4zNTA1OCAxNi45ODYxIDguMzQ2MDcgMTYuOTg3MyA4LjM0MjQ1IDE2Ljk4NzhDOC4zMzg4MyAxNi45ODgyIDguMzM0MTYgMTYuOTg4IDguMzI4NTMgMTYuOTg2NEM4LjMyMjA3IDE2Ljk4NDUgOC4zMTY5OCAxNi45ODE0IDguMzE0NiAxNi45Nzk0TDkuNTk3MzUgMTUuNDQ1Wk0xMC43NDQ5IDE2LjQwNDNMOS41OTczNSAxNS40NDVMOC4zMTQ2IDE2Ljk3OTRMOS40NjIxNyAxNy45Mzg4TDEwLjc0NDkgMTYuNDA0M1pNMTEuMTAzNSAxNy4xNzE5VjE3LjE3MTVIOS4xMDM1NFYxNy4xNzE5SDExLjEwMzVaTTEwLjc0NDcgMTYuNDA0M0wxMC43MzIxIDE2LjM5NDFMOS40NzQ5NSAxNy45NDk2TDkuNDg3NDYgMTcuOTU5N0wxMC43NDQ3IDE2LjQwNDNaTTEwLjg2MyAxNi41MDNMMTAuNzU3NCAxNi40MTQ4TDkuNDc0NjkgMTcuOTQ5Mkw5LjU4MDI0IDE4LjAzNzVMMTAuODYzIDE2LjUwM1pNOS40NTU4NSAxNi42MjcxTDkuNDU0MzkgMTYuNjI4OUwxMC45ODg4IDE3LjkxMTZMMTAuOTkwMyAxNy45MDk5TDkuNDU1ODUgMTYuNjI3MVpNMTEuNjI4MyAxNy4xMTg1TDEwLjg1MTcgMTYuNDkwN0w5LjU5NDQ5IDE4LjA0NjJMMTAuMzcxMiAxOC42NzM5TDExLjYyODMgMTcuMTE4NVpNOS45OTk3NSAxN1YxNy44OTYySDExLjk5OTdWMTdIOS45OTk3NVpNMTAuOTk5MyAxOEgxMC45OTk3VjE2SDEwLjk5OTNWMThaTTkuOTk5MzMgMTAuOTA3NVYxN0gxMS45OTkzVjEwLjkwNzVIOS45OTkzM1pNMTEuOTczMSA4LjkzNTg3QzEwLjg4NDkgOC45MzU4NyA5Ljk5OTMzIDkuODE3OTEgOS45OTkzMyAxMC45MDc1SDExLjk5OTNDMTEuOTk5MyAxMC45MTA0IDExLjk5ODUgMTAuOTE1NCAxMS45OTY1IDEwLjkyMDNDMTEuOTk0NyAxMC45MjQ0IDExLjk5MjcgMTAuOTI3IDExLjk5MTEgMTAuOTI4NUMxMS45ODk2IDEwLjkzMDEgMTEuOTg3MiAxMC45MzE5IDExLjk4MzUgMTAuOTMzNEMxMS45NzkyIDEwLjkzNTMgMTEuOTc1IDEwLjkzNTkgMTEuOTczMSAxMC45MzU5VjguOTM1ODdaTTEzLjk0MjUgMTAuOTAzMUMxMy45NDI2IDkuODE1OTggMTMuMDU4OSA4LjkzNTg3IDExLjk3MzEgOC45MzU4N1YxMC45MzU5QzExLjk3MDcgMTAuOTM1OSAxMS45NjU5IDEwLjkzNTIgMTEuOTYxIDEwLjkzMzFDMTEuOTU2OCAxMC45MzEzIDExLjk1NCAxMC45MjkyIDExLjk1MiAxMC45MjcyQzExLjk1MDEgMTAuOTI1MyAxMS45NDc3IDEwLjkyMjMgMTEuOTQ1NyAxMC45MTc2QzExLjk0MzUgMTAuOTEyMiAxMS45NDI1IDEwLjkwNjYgMTEuOTQyNSAxMC45MDMxTDEzLjk0MjUgMTAuOTAzMVpNMTIuOTQyNyA5LjkwMzA5SDEyLjk0MjVWMTEuOTAzMUgxMi45NDI3VjkuOTAzMDlaTTEzLjk0MjcgMTUuOTk5OVYxMC45MDMxSDExLjk0MjdWMTUuOTk5OUgxMy45NDI3Wk0xMy45NDI3IDE0Ljk5OTlIMTIuOTQyN1YxNi45OTk5SDEzLjk0MjdWMTQuOTk5OVpNMTIuOTQyNyA5LjAyODMyVjE1Ljk5OTlIMTQuOTQyN1Y5LjAyODMySDEyLjk0MjdaIiBmaWxsPSJibGFjayIgbWFzaz0idXJsKCNwYXRoLTEtb3V0c2lkZS0xXzE3MzhfOTUzNikiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kXzE3MzhfOTUzNiIgeD0iLTMiIHk9Ii0yIiB3aWR0aD0iMzgiIGhlaWdodD0iMzgiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldCBkeT0iMSIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxLjUiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMzUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvd18xNzM4Xzk1MzYiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfMTczOF85NTM2IiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8L2RlZnM+Cjwvc3ZnPgo=';

enum WheelAction {
  TouchPadPinchUp = 'TouchPadPinchUp',
  TouchPadPinchDown = 'TouchPadPinchDown',
  TouchPadMoveUp = 'TouchPadMoveUp',
  TouchPadMoveDown = 'TouchPadMoveDown',
  MouseUp = 'MouseUp',
  MouseDown = 'MouseDown',
}

export function useDraggable(options: {
  container: string | HTMLElement;
  dragContainer: string | HTMLElement;
  redrawContainer: string | HTMLElement;
}) {
  let startPanX = 0;
  let startPanY = 0;

  let containerWidth = 0;
  let containerHeight = 0;

  const scaleSize = ref(1);
  const translateX = ref(0);
  const translateY = ref(0);
  const isDragging = ref(false);

  let containerEl: HTMLElement | null;
  let dragContainerEl: HTMLElement | null;
  let redrawContainerEl: HTMLElement | null;

  function initDraggable() {
    if (options.container instanceof HTMLElement) {
      containerEl = options.container;
    } else {
      containerEl = document.getElementById(options.container)!;
    }
    if (options.dragContainer instanceof HTMLElement) {
      dragContainerEl = options.dragContainer;
    } else {
      dragContainerEl = document.querySelector(options.dragContainer)!;
    }
    if (options.redrawContainer instanceof HTMLElement) {
      redrawContainerEl = options.redrawContainer;
    } else {
      redrawContainerEl = document.querySelector(options.redrawContainer)!;
    }
    containerWidth = containerEl.clientWidth;
    containerHeight = containerEl.clientHeight;

    bindListener();
  }

  function destroyDraggable() {
    unbindListener();
    containerEl = null;
    dragContainerEl = null;
    redrawContainerEl = null;
  }

  function bindListener() {
    if (dragContainerEl && containerEl) {
      dragContainerEl.addEventListener('mousedown', dragMousedown);
      document.addEventListener('mousemove', dragMousemove);
      document.addEventListener('mouseup', dragMouseup);
      document.addEventListener('mouseleave', dragMouseleave);
      containerEl.addEventListener('wheel', handleWheel);
    }
  }

  function unbindListener() {
    if (dragContainerEl && containerEl) {
      dragContainerEl.removeEventListener('mousedown', dragMousedown);
      document.removeEventListener('mousemove', dragMousemove);
      document.removeEventListener('mouseup', dragMouseup);
      document.removeEventListener('mouseleave', dragMouseleave);
      containerEl.removeEventListener('wheel', handleWheel);
    }
  }

  function dragMousedown(event: MouseEvent) {
    isDragging.value = true;
    console.log('Mouse down at: ', event.clientX, event.clientY);
    [startPanX, startPanY] = [event.clientX, event.clientY];
  }

  function dragMousemove(event: MouseEvent) {
    if (isDragging.value) {
      const dx = (event.clientX - startPanX) / scaleSize.value;
      const dy = (event.clientY - startPanY) / scaleSize.value;
      const { x, y } = getRange();
      translateX.value = getValueInRange(translateX.value + dx, x);
      translateY.value = getValueInRange(translateY.value + dy, y);
      changeMoveStyle();
      console.log('Mouse move at: ', dx, translateX.value, translateY.value);
      [startPanX, startPanY] = [event.clientX, event.clientY];
    }
  }

  function dragMouseup() {
    if (isDragging.value) {
      isDragging.value = false;
    }
  }

  function dragMouseleave() {
    if (isDragging.value) {
      isDragging.value = false;
    }
  }

  function getRange() {
    const boundaryX = Math.abs(containerWidth / scaleSize.value / 2);
    const boundaryY = Math.abs(containerHeight / scaleSize.value / 2);
    return {
      x: { min: -boundaryX, max: boundaryX },
      y: { min: -boundaryY, max: boundaryY },
    };
  }

  function getValueInRange(value: number, range: { min: number; max: number }) {
    return Math.min(range.max, Math.max(range.min, value));
  }

  function changeMoveStyle() {
    if (redrawContainerEl) {
      redrawContainerEl.style.transition = isDragging.value
        ? 'none'
        : 'transform 200ms';
      redrawContainerEl.style.transform = `scale(${scaleSize.value}) translate(${translateX.value}px, ${translateY.value}px)`;
    }
  }

  function handleWheel(event: WheelEvent) {
    event.preventDefault();
    event.stopPropagation();
    const { action } = checkWheelAction(event);
    console.log('Wheel action', action);
    if (
      [
        WheelAction.TouchPadPinchUp,
        WheelAction.TouchPadPinchDown,
        WheelAction.MouseUp,
        WheelAction.MouseDown,
      ].includes(action)
    ) {
      handleScale(
        action === WheelAction.MouseUp ||
          action === WheelAction.TouchPadPinchUp,
        action === WheelAction.TouchPadPinchDown ||
          action === WheelAction.TouchPadPinchUp
      );
    }
  }

  function handleScale(isUp: boolean, isTouch: boolean) {
    const flag = isTouch ? (isUp ? 1.03 : 0.97) : isUp ? 1.06 : 0.94;
    scaleSize.value = Math.max(
      0.33,
      Math.min(3, Math.abs(scaleSize.value * flag))
    );
  }

  function checkWheelAction(event: WheelEvent) {
    if (event.ctrlKey) {
      return {
        action:
          event.deltaY > 0
            ? WheelAction.TouchPadPinchDown
            : WheelAction.TouchPadPinchUp,
      };
    }
    return (event.deltaY ? Math.abs(event.deltaY) < 100 : event.deltaMode === 0)
      ? {
          action:
            event.deltaY > 0
              ? WheelAction.TouchPadMoveUp
              : WheelAction.TouchPadMoveDown,
        }
      : {
          action:
            event.deltaY > 0 ? WheelAction.MouseUp : WheelAction.MouseDown,
        };
  }

  return { initDraggable, destroyDraggable };
}

export function useImageRedraw(options: {
  container: string | HTMLElement;
  dragClass: string;
  imageClass: string;
  editorClass: string;
  redrawClass: string;
}) {
  let containerEl: HTMLElement | null;
  let editorInnerEl: HTMLElement | null;
  let dragContainerEl: HTMLElement | null;
  let imageContainerEl: HTMLElement | null;
  let editorContainerEl: HTMLElement | null;
  let redrawContainerEl: HTMLElement | null;

  let imageEl: HTMLImageElement | null;

  let canvas: HTMLCanvasElement | null;
  let ctx: CanvasRenderingContext2D | null;

  let drawPath = resetPath();

  let lastX = 0;
  let lastY = 0;

  const canvasSize = { width: 0, height: 0 };
  const imageSize = { width: 0, height: 0, ratio: 1 };

  const undoPaths: DrawPath[] = [];
  const redoPaths: DrawPath[] = [];

  const brushSize = ref(15);
  const eraserSize = ref(15);
  const isDrawing = ref(false); // 是否正在绘制
  const currentTool = ref<PathType>(); // 当前工具类型

  const { initDraggable, destroyDraggable } = useDraggable({
    container: options.container,
    dragContainer: `.${options.dragClass}`,
    redrawContainer: `.${options.redrawClass}`,
  });

  function setTool(tool: PathType) {
    currentTool.value = tool;
    if (!editorInnerEl) {
      return;
    }
    if (tool === 'eraser') {
      editorInnerEl.style.cursor = `url("${eraserImageBase64}") 16 16, auto`;
    } else if (tool === 'brush') {
      editorInnerEl.style.cursor = `url("${brushImageBase64}") 16 16, auto`;
    }
    if (tool === 'drag') {
      dragContainerEl!.style.display = 'block';
    } else {
      dragContainerEl!.style.display = 'none'; // 隐藏拖拽容器
    }
  }

  function loadImage(url: string) {
    imageEl = new Image();
    imageEl.height = 482;
    imageEl.loading = 'lazy';
    imageEl.draggable = false;
    imageEl.fetchPriority = 'high';
    imageEl.crossOrigin = 'anonymous'; // 允许跨域加载图片
    imageEl.style.overflow = 'hidden';
    imageEl.style.objectFit = 'contain';
    imageEl.onload = function () {
      setImageSize();
      setCanvasSize();
      changeCanvasSize();
      changeCanvasScale();
    };
    imageEl.onerror = function () {
      console.error('Failed to load image');
    };
    imageEl.src = url;
  }

  function setImageSize() {
    imageSize.width = imageEl!.naturalWidth;
    imageSize.height = imageEl!.naturalHeight;
    imageSize.ratio = imageSize.width / imageSize.height;
  }

  function setCanvasSize() {
    const { width, height } = getCanvasSize();
    canvasSize.width = width;
    canvasSize.height = height;
    if (redrawContainerEl) {
      redrawContainerEl.style.width = `${canvasSize.width}px`;
      redrawContainerEl.style.height = `${canvasSize.height}px`;
    }
    if (editorInnerEl) {
      editorInnerEl.style.width = `${canvasSize.width}px`;
      editorInnerEl.style.height = `${canvasSize.height}px`;
    }
  }

  function getCanvasSize() {
    const containerWidth = containerEl!.clientWidth;
    const containerHeight = containerEl!.clientHeight;
    if (imageSize.ratio > containerWidth / containerHeight) {
      if (imageSize.width > containerWidth) {
        return {
          width: containerWidth,
          height: containerWidth / imageSize.ratio,
        };
      }
    } else {
      if (imageSize.height > containerHeight) {
        return {
          width: containerHeight * imageSize.ratio,
          height: containerHeight,
        };
      }
    }
    return { width: imageSize.width, height: imageSize.height };
  }

  function changeCanvasSize() {
    if (canvas) {
      canvas.width = imageSize.width;
      canvas.height = imageSize.height;
      canvas.style.width = `${canvasSize.width}px`;
      canvas.style.height = `${canvasSize.height}px`;
    }
    initCanvasContext();
  }

  function changeCanvasScale() {
    if (ctx) {
      ctx.scale(
        imageSize.width / canvasSize.width,
        imageSize.height / canvasSize.height
      );
    }
    loadBrushImage(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADBJREFUOE9jbAp4ZsyAB4hISuKTZmAcNWBYhMG0zP9408Gb58/xp4NRAxgYh34YAABF7zjxN4qb+wAAAABJRU5ErkJggg=='
    );
  }

  function loadBrushImage(url: string) {
    const image = new Image();
    image.src = url;
    image.onload = function () {
      if (ctx) {
        ctx.strokeStyle = ctx.createPattern(image, 'repeat')!;
      }
    };
  }

  function execUndo() {
    const popItem = undoPaths.pop();
    if (popItem) {
      redoPaths.push(popItem);
      clearRect();
      drawPaths(undoPaths);
    }
  }

  function execRedo() {
    const popItem = redoPaths.pop();
    if (popItem) {
      undoPaths.push(popItem);
      clearRect();
      drawPaths(undoPaths);
    }
  }

  function resetPath(): DrawPath {
    return {
      points: [],
      type: 'brush',
      lineWidth: 15,
      lineCap: 'round',
      lineJoin: 'round',
      strokeStyle: '#000000',
    };
  }

  function savePath(offsetX: number, offsetY: number) {
    drawPath.points.push([offsetX, offsetY]);
    Object.assign(drawPath, {
      type: currentTool.value,
      lineCap: ctx?.lineCap,
      lineJoin: ctx?.lineJoin,
      lineWidth: ctx?.lineWidth,
      strokeStyle: ctx?.strokeStyle,
    });
  }

  function createRedrawContainer() {
    redrawContainerEl = document.createElement('div');
    redrawContainerEl.classList.add(options.redrawClass);
    redrawContainerEl.appendChild(createImageContainer());
    redrawContainerEl.appendChild(createCanvasContainer());
    redrawContainerEl.appendChild(createDragContainer());
    containerEl!.appendChild(redrawContainerEl);
  }

  function createImageContainer() {
    imageContainerEl = document.createElement('div');
    imageContainerEl.classList.add(options.imageClass);
    const imageInner = document.createElement('div');
    imageInner.style.transition = 'opacity 300ms';
    imageInner.style.opacity = '1';
    imageInner.appendChild(imageEl!);
    imageContainerEl.appendChild(imageInner);
    return imageContainerEl;
  }

  function createCanvasContainer() {
    editorContainerEl = document.createElement('div');
    editorContainerEl.classList.add(options.editorClass);
    editorInnerEl = document.createElement('div');
    editorInnerEl.style.position = 'relative';
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    bindListener();
    editorInnerEl.appendChild(canvas);
    editorContainerEl.appendChild(editorInnerEl);
    return editorContainerEl;
  }

  function createDragContainer() {
    dragContainerEl = document.createElement('div');
    dragContainerEl.classList.add(options.dragClass);
    dragContainerEl.style.display =
      currentTool.value === 'drag' ? 'block' : 'none';
    dragContainerEl.style.cursor = `url("${dragImageBase64}") 16 16, auto`;
    return dragContainerEl;
  }

  function initCanvasContext() {
    if (ctx) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }

  function bindListener() {
    // 事件监听
    if (canvas) {
      canvas.addEventListener('mousedown', handleMousedown);
      canvas.addEventListener('mousemove', handleMousemove);
      canvas.addEventListener('mouseout', handleMouseout);
      canvas.addEventListener('mouseover', handleMouseover);
    }
    window.addEventListener(
      'onpointerup' in window ? 'pointerup' : 'mouseup',
      handleMouseup
    );
  }

  function unbindListener() {
    // 解除事件监听
    if (canvas) {
      canvas.removeEventListener('mousedown', handleMousedown);
      canvas.removeEventListener('mousemove', handleMousemove);
      canvas.removeEventListener('mouseout', handleMouseout);
      canvas.removeEventListener('mouseover', handleMouseover);
    }
    window.removeEventListener(
      'onpointerup' in window ? 'pointerup' : 'mouseup',
      handleMouseup
    );
  }

  function initRedraw(url: string) {
    if (options.container instanceof HTMLElement) {
      containerEl = options.container;
    } else {
      containerEl = document.getElementById(options.container)!;
    }
    loadImage(url);
    createRedrawContainer();
    setTool('brush');
    initDraggable();
  }

  function destroyRedraw() {
    destroyDraggable();
    unbindListener();
    undoPaths.length = 0;
    redoPaths.length = 0;
    drawPath = resetPath();
    redrawContainerEl?.remove();
    ctx = null;
    canvas = null;
    imageEl = null;
    containerEl = null;
    editorInnerEl = null;
    dragContainerEl = null;
    imageContainerEl = null;
    editorContainerEl = null;
    redrawContainerEl = null;
  }

  function drawLine(event: MouseEvent) {
    if (isDrawing.value && ctx) {
      ctx.save();
      ctx.globalCompositeOperation =
        currentTool.value === 'eraser' ? 'destination-out' : 'xor';
      ctx.lineWidth =
        currentTool.value === 'eraser' ? eraserSize.value : brushSize.value;
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
      savePath(event.offsetX, event.offsetY);
      ctx.restore();
      [lastX, lastY] = [event.offsetX, event.offsetY];
    }
  }

  function drawPaths(paths: DrawPath[]) {
    paths.forEach((path) => {
      if (ctx) {
        ctx.save();
        ctx.globalCompositeOperation =
          path.type === 'brush' ? 'xor' : 'destination-out';
        ctx.lineWidth = path.lineWidth;
        ctx.strokeStyle = path.strokeStyle;
        ctx.beginPath();
        for (let i = 0; i < path.points.length; i++) {
          const [x, y] = path.points[i];
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
            ctx.stroke();
          }
        }
        ctx.restore();
      }
    });
  }

  function clearRect() {
    if (ctx) {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
    }
  }

  function handleMousedown(event: MouseEvent) {
    isDrawing.value = true;
    drawPath = resetPath();
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(event.offsetX, event.offsetY);
      savePath(event.offsetX, event.offsetY);
    }
  }

  function handleMousemove(event: MouseEvent) {
    drawLine(event);
  }

  function handleMouseup(event: MouseEvent) {
    if (isDrawing.value) {
      if (lastX === event.offsetX && lastY === event.offsetY) {
        drawLine(event);
      }
      if (ctx) {
        ctx.closePath();
      }
      undoPaths.push(drawPath);
      isDrawing.value = false;
    }
  }

  function handleMouseover(event: MouseEvent) {
    console.log('Mouse over', event.offsetX, event.offsetY);
  }

  function handleMouseout(event: MouseEvent) {
    console.log('Mouse out', event.offsetX, event.offsetY);
  }

  return {
    isDrawing,
    currentTool,
    setTool,
    execUndo,
    execRedo,
    loadImage,
    initRedraw,
    destroyRedraw,
  };
}
