import {useEffect} from 'react';

const useKeyboardShortcuts = (
    onSave: () => void,
    onNewNote: () => void,
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
                    default:
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [onSave, onNewNote, onSearch])
}

export default useKeyboardShortcuts