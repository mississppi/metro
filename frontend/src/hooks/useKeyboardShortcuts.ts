import {useEffect} from 'react';

const useKeyboardShortcuts = (
    onNewPost: () => void,
    onUpdate: () => void,
    onSearch: () => void,
) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.metaKey) {
                switch(e.key) {
                    //保存
                    case 's':
                        e.preventDefault();
                        onUpdate();
                        break;

                    //1行コピー機能
                    case 'c':
                        //テキストエリア内の押下か判定
                        const activeElement = document.activeElement as HTMLElement;
                        if(isTextArea(activeElement)){
                            const textarea = activeElement as HTMLTextAreaElement;
                            if (!isTextSelected(textarea)) {
                                e.preventDefault();
                                copyLine(textarea);
                            }
                        }
                        break;

                    //新規作成
                    case 'n':
                        e.preventDefault();
                        onNewPost();
                        break;
                    default:
                        break;
                }
            }
        };

        

        const copyLine = (textarea: HTMLTextAreaElement) => {
            handleTextarea(textarea);
        }

        const handleTextarea = (textarea: HTMLTextAreaElement) => {
            const startOfLinePosition = findPreviousNewlinePosition(textarea);
            const endOfLinePosition = findNextNewlinePosition(textarea);
            
            // 選択範囲のテキストを取得
            const selectedText = textarea.value.substring(startOfLinePosition, endOfLinePosition);
            
            //copy
            navigator.clipboard.writeText(selectedText)
                .then(() => console.log('copied', selectedText))
                .catch(err => console.log('failed', err))
        }

        //キャレットが選択状態か判定する
        const isTextSelected = (textarea: HTMLTextAreaElement): boolean => {
            return textarea.selectionStart !== textarea.selectionEnd;
        };

        //textareaがアクティブであるか判定する
        const isTextArea = (activeElement: HTMLElement): boolean => {
            return activeElement && activeElement.tagName === "TEXTAREA"
        }

        //開始位置を取得
        const findPreviousNewlinePosition = (textarea: HTMLTextAreaElement): number => {
            let position = textarea.selectionStart;
            // キャレットの一つ前の文字から始める
            while (position > 0 && textarea.value.charAt(position - 1) !== '\n') {
                position--;
            }
            return position; // 改行コードの次の位置、もしくはテキストの先頭位置
        };

        //終了位置を取得
        const findNextNewlinePosition = (textarea: HTMLTextAreaElement): number => {
            let position = textarea.selectionEnd;
            // 現在の位置から次の改行コードを見つけるまで進む
            while (position < textarea.value.length && textarea.value.charAt(position) !== '\n') {
                position++;
            }
            return position; // 改行コードの位置、もしくはテキストの末尾位置
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [onNewPost, onUpdate, onSearch])
}

export default useKeyboardShortcuts