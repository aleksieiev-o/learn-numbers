import React, { createContext, FC, ReactElement, useEffect, useState } from 'react';

interface Props {
  children: ReactElement;
}

export interface IStartPlayingDto {
  text: string;
  langURI: string;
  volume: number;
  rate: number;
  pitch: number;
}

interface ISpeechUtteranceContextState {
  voicesList: Array<SpeechSynthesisVoice>;
  isSpeaking: boolean;
  isPause: boolean;
  start: (payload: IStartPlayingDto) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
}

export const SpeechUtteranceContext = createContext<ISpeechUtteranceContextState>({
  voicesList: [],
  isSpeaking: false,
  isPause: false,
  start: () => undefined,
  stop: () => undefined,
  pause: () => undefined,
  resume: () => undefined,
});

const SpeechUtteranceContextProvider: FC<Props> = ({ children }): ReactElement => {
  const speech: SpeechSynthesis = window.speechSynthesis;
  const [voicesList, setVoicesList] = useState<Array<SpeechSynthesisVoice>>([]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPause, setIsPause] = useState<boolean>(false);

  useEffect(() => {
    if (speech) {
      speech.onvoiceschanged = () => {
        setVoicesList(speech.getVoices());
      };

      setVoicesList(speech.getVoices());
    }
  }, []);

  const initializeHandlers = (utterance: SpeechSynthesisUtterance): void => {
    utterance.addEventListener('start', () => {
      setIsSpeaking(true);
      setIsPause(false);
    });
    utterance.addEventListener('end', () => {
      setIsSpeaking(false);
      setIsPause(false);
    });
    utterance.addEventListener('error', () => {
      setIsSpeaking(false);
      setIsPause(false);
    });
    utterance.addEventListener('pause', () => {
      setIsPause(true);
    });
    utterance.addEventListener('resume', () => {
      setIsPause(false);
    });
  };

  const stop = (): void => {
    speech.cancel();
  };

  const start = (payload: IStartPlayingDto): void => {
    const {text, langURI, volume, rate, pitch} = payload;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const voice: SpeechSynthesisVoice = voicesList.find((voice: SpeechSynthesisVoice) => voice.voiceURI === langURI)!;

    if (isSpeaking) {
      stop();
    }

    const utterance = new SpeechSynthesisUtterance();

    initializeHandlers(utterance);

    utterance.text = text;
    utterance.voice = voice;
    utterance.lang = voice.lang;
    utterance.volume = volume;
    utterance.rate = rate;
    utterance.pitch = pitch;

    speech.speak(utterance);
  };

  const pause = (): void => {
    speech.pause();
  };

  const resume = (): void => {
    speech.resume();
  };

  const themeContext: ISpeechUtteranceContextState = {
    voicesList,
    start,
    stop,
    pause,
    resume,
    isSpeaking,
    isPause,
  };

  return (
    <SpeechUtteranceContext.Provider value={themeContext}>
      {children}
    </SpeechUtteranceContext.Provider>
  );
};

export default SpeechUtteranceContextProvider;
