; AutoHotkey script to send keystrokes to both Edge and VS Code

; 모든 키에 대해 작동하도록 설정
~*:: ; 모든 키에 대해 작동
    ; 현재 활성화된 윈도우를 저장
    currentWin := WinActive("A")
    
    ; 눌린 키를 변수에 저장
    key := SubStr(A_ThisHotkey, 3) ; '~*'을 제거하고 키를 추출

    ; VS Code에 키 입력 전송
    IfWinExist, ahk_exe Code.exe
    {
        SendInput, %key%  ; VS Code에 입력
    }

    ; Edge에 키 입력 전송
    IfWinExist, ahk_exe msedge.exe
    {
        ControlSend, , %key%, ahk_exe msedge.exe  ; Edge에 입력
    }

    ; 원래의 활성 윈도우로 포커스 복원
    WinActivate, ahk_id %currentWin%
return
