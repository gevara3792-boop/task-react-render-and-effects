import { useEffect, useState } from 'react';
import { subscribe, unsubscribe } from './resources/API';

export function Effects(props: { sourceId: string }) {
    const [message, setMessage] = useState<string>('-1');

    useEffect(() => {
        // Reset message when source changes
        setMessage('-1');

        const callback = (newMessage: string) => {
            setMessage(newMessage);
        };

        // Subscribe to the new source
        subscribe(props.sourceId, callback);

        // Cleanup: unsubscribe when sourceId changes or component unmounts
        return () => {
            unsubscribe(props.sourceId, callback);
        };
    }, [props.sourceId]);

    return (
        <div>
            {props.sourceId}: {message}
        </div>
    );
}
