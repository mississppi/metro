import {useEffect} from 'react';

const useKeyboardShortcuts = (
    onSave: () => void,
    onNewPost: () => void,
    onSearch: () => void,
) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.metaKey) {
                switch(e.key) {
                    case 's':
                        e.preventDefault();
                        onSave();
                        break;
                    case 'c':
                        e.preventDefault();
                        // onSave();
                        // onNewPost();
                        break;
                    case 'n':
                        if (e.shiftKey) { // cmd + shift + n の場合
                            e.preventDefault();
                            onNewPost(); // 新規作成処理
                        }
                        break;
                    default:
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [onSave, onNewPost, onSearch])
}

export default useKeyboardShortcuts