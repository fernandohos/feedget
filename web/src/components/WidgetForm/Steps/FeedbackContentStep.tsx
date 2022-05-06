import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent } from "react";
import { useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";
import { api } from '../../../lib/api';
import { Loading } from '../../Loading';
import axios from 'axios';

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;
}

export function FeedbackContentStep({feedbackType, onFeedbackRestartRequested, onFeedbackSent}: FeedbackContentStepProps) {
    const feedbackTypeInfo = feedbackTypes[feedbackType];
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState<string>('');
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);

    async function handleSumbitFeedback(event: FormEvent) {
        event.preventDefault();
        setIsSendingFeedback(true);

        // fetch('http://localhost:3333/feedbacks', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         type: feedbackType,
        //         screenshot,
        //         comment
        //     })
        // }).then(res => console.log(res)).catch(res => console.log(res));

        await api.post('/feedbacks', {
            type: feedbackType,
            screenshot,
            comment
        });
        
        setIsSendingFeedback(false);
        onFeedbackSent();
    }

    return (
        <>
            <header>
                <button 
                    type="button"
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                >
                    <ArrowLeft 
                        weight="bold" 
                        className="w-4 h-4"
                        onClick={onFeedbackRestartRequested}
                    />
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img 
                        src={feedbackTypeInfo.image.source} 
                        alt={feedbackTypeInfo.image.alt} 
                        className="w-6 h-6"
                    />
                    {feedbackTypeInfo.title}
                    </span>
                <CloseButton />
            </header>
            <form className="my-4 w-full" onSubmit={handleSumbitFeedback}>
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100  bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte com detalhes o que esta acontecendo..."
                    onChange={(e) => setComment(e.target.value)}
                />
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton 
                        onScreenshotTook={setScreenshot}
                        screenshot={screenshot}
                    />
                    <button
                        type="submit"
                        disabled={!comment || isSendingFeedback}
                        className="p-2 rounded-md bg-brand-500 rouded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        {isSendingFeedback ? <Loading /> : 'Enviar Feedback'}
                    </button>
                </footer>
            </form>
        </>
    )
}