import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Language, LANGUAGES, getLanguageByName } from "@/lib/languages";

export interface TestCase {
  id: string;
  input: string;
  output: string;
  expected_output: string;
  hidden: boolean;
  runtime: number;
  memory: number;
  question_id: string;
}
export type QuestionCode = {
  questionId: string;
  code: string;
};

export interface CompilerResult {
  isCompileSuccess: boolean;
  message: string;
}

interface KitchenState {
  selectedQuestionId: string;
  selectedLanguage: Language;
  codeByQuestion: QuestionCode[];

  fullScreenRight: boolean;
  fullScreenEditor: boolean;
  fullScreenTestCases: boolean;
  fullScreenQuestion: boolean;
  showModal: "default" | "green" | "red" | "yellow" | null;

  testResults: TestCase[];
  compilerDetails: CompilerResult | null;
  activeCaseIndex: number;

  setSelectedQuestionId: (id: string) => void;
  setSelectedLanguage: (language: Language) => void;
  setCodeForQuestion: (questionId: string, code: string) => void;
  setFullScreenRight: (fullScreen: boolean) => void;
  setFullScreenEditor: (fullScreen: boolean) => void;
  setFullScreenTestCases: (fullScreen: boolean) => void;
  setFullScreenQuestion: (fullScreen: boolean) => void;
  setShowModal: (modal: "default" | "green" | "red" | "yellow" | null) => void;
  setTestResults: (results: TestCase[]) => void;
  setCompilerDetails: (details: CompilerResult | null) => void;
  setActiveCaseIndex: (index: number) => void;
  resetKitchenState: () => void;
}

const initialState = {
  selectedQuestionId: "1",
  selectedLanguage: LANGUAGES.Python,
  fullScreenRight: false,
  fullScreenEditor: false,
  fullScreenTestCases: false,
  fullScreenQuestion: false,
  showModal: null,
  testResults: [],
  compilerDetails: null,
  activeCaseIndex: 0,
  codeByQuestion: [],
};

const useKitchenStore = create<KitchenState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        setSelectedQuestionId: (id) => set({ selectedQuestionId: id }),

        setSelectedLanguage: (language) => set({ selectedLanguage: language }),

        setCodeForQuestion: (questionId, code) =>
          set((state) => {
            const existing = state.codeByQuestion.find(
              (q) => q.questionId === questionId
            );
            if (existing) {
              return {
                codeByQuestion: state.codeByQuestion.map((q) =>
                  q.questionId === questionId ? { ...q, code } : q
                ),
              };
            }
            return {
              codeByQuestion: [...state.codeByQuestion, { questionId, code }],
            };
          }),

        setFullScreenRight: (fullScreen) => set({ fullScreenRight: fullScreen }),

        setFullScreenEditor: (fullScreen) => set({ fullScreenEditor: fullScreen }),

        setFullScreenTestCases: (fullScreen) =>
          set({ fullScreenTestCases: fullScreen }),

        setFullScreenQuestion: (fullScreen) =>
          set({ fullScreenQuestion: fullScreen }),

        setShowModal: (modal) => set({ showModal: modal }),

        setTestResults: (results) => set({ testResults: results }),

        setCompilerDetails: (details) => set({ compilerDetails: details }),

        setActiveCaseIndex: (index) => set({ activeCaseIndex: index }),

        resetKitchenState: () => set(initialState),
      }),
      {
        name: "kitchen-storage",
        partialize: (state) => ({
          selectedLanguage: state.selectedLanguage,
          codeByQuestion: state.codeByQuestion,
        }),
        storage: {
          getItem: (name) => {
            const str = localStorage.getItem(name);
            if (!str) return null;
            const { state } = JSON.parse(str);
            const language = getLanguageByName(state.selectedLanguage.name);
            return {
              ...JSON.parse(str),
              state: {
                ...state,
                selectedLanguage: language || LANGUAGES.Python,
              },
            };
          },
          setItem: (name, newValue) => {
            const { state, version } = newValue;
            const str = JSON.stringify({
              state: {
                selectedLanguage: { name: state.selectedLanguage.name },
                codeByQuestion: state.codeByQuestion,
              },
              version,
            });
            localStorage.setItem(name, str);
          },
          removeItem: (name) => localStorage.removeItem(name),
        },
      }
    ),
    {
      name: "kitchen-store",
    }
  )
);

export default useKitchenStore;
