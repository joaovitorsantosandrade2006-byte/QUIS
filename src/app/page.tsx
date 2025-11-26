"use client"

import { useState, useEffect } from "react"
import { Brain, Trophy, RotateCcw, ChevronRight, CheckCircle2, XCircle, Share2, MessageCircle, Sparkles, Zap, Target, Star } from "lucide-react"

// 50 Perguntas do quiz de QI com níveis variados
const questions = [
  // NÍVEL FÁCIL (1-15)
  { id: 1, question: "Qual número completa a sequência: 2, 4, 6, 8, ?", options: ["9", "10", "11", "12"], correct: 1, difficulty: "easy" },
  { id: 2, question: "Qual palavra não pertence ao grupo: Maçã, Banana, Cenoura, Laranja", options: ["Maçã", "Banana", "Cenoura", "Laranja"], correct: 2, difficulty: "easy" },
  { id: 3, question: "Quantos lados tem um triângulo?", options: ["2", "3", "4", "5"], correct: 1, difficulty: "easy" },
  { id: 4, question: "Qual é o dobro de 15?", options: ["25", "30", "35", "40"], correct: 1, difficulty: "easy" },
  { id: 5, question: "Qual animal não voa: Águia, Pinguim, Pomba, Coruja", options: ["Águia", "Pinguim", "Pomba", "Coruja"], correct: 1, difficulty: "easy" },
  { id: 6, question: "Complete: 5, 10, 15, 20, ?", options: ["22", "25", "30", "35"], correct: 1, difficulty: "easy" },
  { id: 7, question: "Qual número é ímpar: 2, 4, 7, 8", options: ["2", "4", "7", "8"], correct: 2, difficulty: "easy" },
  { id: 8, question: "Quantos meses tem um ano?", options: ["10", "11", "12", "13"], correct: 2, difficulty: "easy" },
  { id: 9, question: "Qual é maior: 50 ou 45?", options: ["50", "45", "Iguais", "Nenhum"], correct: 0, difficulty: "easy" },
  { id: 10, question: "Complete: A, B, C, D, ?", options: ["E", "F", "G", "H"], correct: 0, difficulty: "easy" },
  { id: 11, question: "Qual cor você obtém misturando azul e amarelo?", options: ["Roxo", "Verde", "Laranja", "Marrom"], correct: 1, difficulty: "easy" },
  { id: 12, question: "Quantas patas tem um cachorro?", options: ["2", "3", "4", "5"], correct: 2, difficulty: "easy" },
  { id: 13, question: "Qual número vem depois de 99?", options: ["100", "101", "98", "200"], correct: 0, difficulty: "easy" },
  { id: 14, question: "Qual é o oposto de 'quente'?", options: ["Gelado", "Frio", "Morno", "Congelado"], correct: 1, difficulty: "easy" },
  { id: 15, question: "Complete: 1, 3, 5, 7, ?", options: ["8", "9", "10", "11"], correct: 1, difficulty: "easy" },

  // NÍVEL MÉDIO (16-35)
  { id: 16, question: "Qual número completa: 2, 4, 8, 16, ?", options: ["24", "32", "28", "20"], correct: 1, difficulty: "medium" },
  { id: 17, question: "Se todos os Bloops são Razzies e todos os Razzies são Lazzies, então todos os Bloops são Lazzies?", options: ["Sim", "Não", "Impossível determinar", "Depende"], correct: 0, difficulty: "medium" },
  { id: 18, question: "Qual é o próximo: 1, 1, 2, 3, 5, 8, ?", options: ["11", "13", "15", "10"], correct: 1, difficulty: "medium" },
  { id: 19, question: "Qual é o próximo na sequência: J, F, M, A, M, ?", options: ["J", "A", "S", "N"], correct: 0, difficulty: "medium" },
  { id: 20, question: "Qual número é diferente: 3, 5, 7, 12, 13", options: ["3", "5", "12", "13"], correct: 2, difficulty: "medium" },
  { id: 21, question: "Complete: 3, 6, 12, 24, ?", options: ["36", "48", "40", "50"], correct: 1, difficulty: "medium" },
  { id: 22, question: "Se A=1, B=2, C=3, quanto vale 'CAB'?", options: ["312", "321", "123", "213"], correct: 0, difficulty: "medium" },
  { id: 23, question: "Quantos triângulos há em uma estrela de 5 pontas?", options: ["5", "10", "15", "20"], correct: 1, difficulty: "medium" },
  { id: 24, question: "Qual palavra fica igual de trás para frente?", options: ["ANA", "CASA", "BOLA", "MESA"], correct: 0, difficulty: "medium" },
  { id: 25, question: "Complete: 100, 95, 90, 85, ?", options: ["75", "80", "70", "82"], correct: 1, difficulty: "medium" },
  { id: 26, question: "Se 2 + 3 = 10, 4 + 5 = 18, quanto é 6 + 7?", options: ["26", "13", "24", "28"], correct: 0, difficulty: "medium" },
  { id: 27, question: "Qual número completa: 1, 4, 9, 16, ?", options: ["20", "25", "30", "24"], correct: 1, difficulty: "medium" },
  { id: 28, question: "Quantos cubos há em um cubo 3x3x3?", options: ["9", "18", "27", "36"], correct: 2, difficulty: "medium" },
  { id: 29, question: "Se você tem 3 maçãs e pega 2, quantas você tem?", options: ["1", "2", "3", "5"], correct: 1, difficulty: "medium" },
  { id: 30, question: "Complete: Z, Y, X, W, ?", options: ["V", "U", "T", "S"], correct: 0, difficulty: "medium" },
  { id: 31, question: "Qual é o próximo: 2, 6, 12, 20, ?", options: ["28", "30", "32", "24"], correct: 1, difficulty: "medium" },
  { id: 32, question: "Se hoje é terça, que dia será em 100 dias?", options: ["Segunda", "Terça", "Quarta", "Quinta"], correct: 2, difficulty: "medium" },
  { id: 33, question: "Quantos minutos há em 2,5 horas?", options: ["120", "130", "140", "150"], correct: 3, difficulty: "medium" },
  { id: 34, question: "Complete: 1, 8, 27, 64, ?", options: ["100", "125", "150", "200"], correct: 1, difficulty: "medium" },
  { id: 35, question: "Qual número falta: 2, 5, 10, 17, ?", options: ["24", "26", "28", "30"], correct: 1, difficulty: "medium" },

  // NÍVEL DIFÍCIL (36-50)
  { id: 36, question: "Se 5 máquinas fazem 5 produtos em 5 minutos, quanto tempo levam 100 máquinas para fazer 100 produtos?", options: ["100 minutos", "20 minutos", "5 minutos", "10 minutos"], correct: 2, difficulty: "hard" },
  { id: 37, question: "Um livro custa R$10 mais metade do seu preço. Quanto custa o livro?", options: ["R$15", "R$20", "R$25", "R$30"], correct: 1, difficulty: "hard" },
  { id: 38, question: "Se você reorganizar 'CIFAIPC', obtém o nome de um:", options: ["Oceano", "País", "Animal", "Cidade"], correct: 0, difficulty: "hard" },
  { id: 39, question: "Complete: 100, 96, 88, 72, ?", options: ["40", "48", "56", "64"], correct: 0, difficulty: "hard" },
  { id: 40, question: "Quantos quadrados há em um tabuleiro de xadrez 8x8?", options: ["64", "204", "104", "144"], correct: 1, difficulty: "hard" },
  { id: 41, question: "Se A=Z, B=Y, C=X, como se escreve 'CAT'?", options: ["XZG", "XZH", "XYG", "XZI"], correct: 0, difficulty: "hard" },
  { id: 42, question: "Complete: 2, 3, 5, 7, 11, 13, ?", options: ["15", "17", "19", "21"], correct: 1, difficulty: "hard" },
  { id: 43, question: "Qual é o próximo: 1, 11, 21, 1211, ?", options: ["111221", "112211", "121121", "111121"], correct: 0, difficulty: "hard" },
  { id: 44, question: "Se um trem elétrico vai de norte a sul, para onde vai a fumaça?", options: ["Norte", "Sul", "Não tem fumaça", "Leste"], correct: 2, difficulty: "hard" },
  { id: 45, question: "Quantas vezes você pode subtrair 10 de 100?", options: ["10", "9", "1", "Infinitas"], correct: 2, difficulty: "hard" },
  { id: 46, question: "Complete: 1, 2, 4, 7, 11, 16, ?", options: ["20", "21", "22", "23"], correct: 2, difficulty: "hard" },
  { id: 47, question: "Se 1=3, 2=3, 3=5, 4=4, 5=4, então 6=?", options: ["3", "4", "5", "6"], correct: 0, difficulty: "hard" },
  { id: 48, question: "Qual é o próximo: 31, 28, 31, 30, 31, 30, ?", options: ["28", "29", "30", "31"], correct: 3, difficulty: "hard" },
  { id: 49, question: "Se você tem uma caixa de fósforos com 50 palitos e usa 48, o que sobra?", options: ["2 palitos", "A caixa e 2 palitos", "Nada", "48 palitos"], correct: 1, difficulty: "hard" },
  { id: 50, question: "Complete: 1, 1, 2, 6, 24, 120, ?", options: ["240", "360", "480", "720"], correct: 3, difficulty: "hard" },
]

type Screen = "start" | "quiz" | "feedback" | "result"

export default function Home() {
  const [screen, setScreen] = useState<Screen>("start")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [iqScore, setIqScore] = useState(0)
  const [bestScore, setBestScore] = useState<number | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  // Carregar melhor pontuação do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("bestIQScore")
    if (saved) setBestScore(parseInt(saved))
  }, [])

  const calculateIQ = (correctAnswers: number) => {
    // Fórmula ajustada para 50 perguntas: base 70 + pontos por acerto
    const baseIQ = 70
    const pointsPerQuestion = 1.5
    return Math.min(Math.round(baseIQ + (correctAnswers * pointsPerQuestion)), 145)
  }

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)
    setShowFeedback(true)

    setTimeout(() => {
      // Pergunta de feedback no meio do quiz (questão 25)
      if (currentQuestion === 24) {
        setScreen("feedback")
        setShowFeedback(false)
        return
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowFeedback(false)
      } else {
        // Calcular resultado
        const correct = newAnswers.filter((ans, idx) => ans === questions[idx].correct).length
        const finalIQ = calculateIQ(correct)
        setIqScore(finalIQ)

        // Salvar melhor pontuação
        if (!bestScore || finalIQ > bestScore) {
          setBestScore(finalIQ)
          localStorage.setItem("bestIQScore", finalIQ.toString())
          setShowConfetti(true)
        }

        setScreen("result")
      }
    }, 1500)
  }

  const continueFeedback = () => {
    setCurrentQuestion(25)
    setScreen("quiz")
  }

  const resetQuiz = () => {
    setScreen("start")
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers([])
    setShowFeedback(false)
    setIqScore(0)
    setShowConfetti(false)
  }

  const shareResult = () => {
    const text = `🧠 Acabei de fazer o Quiz de QI e tirei ${iqScore} pontos! Você consegue me superar? Faça o teste também!`
    
    if (navigator.share) {
      navigator.share({
        title: 'Quiz de QI',
        text: text,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(text + ' ' + window.location.href)
      alert('Link copiado! Compartilhe com seus amigos 🎉')
    }
  }

  const getIQCategory = (iq: number) => {
    if (iq >= 140) return { label: "Genialidade", color: "text-purple-600", bg: "bg-purple-50", icon: Sparkles }
    if (iq >= 130) return { label: "Muito Superior", color: "text-blue-600", bg: "bg-blue-50", icon: Zap }
    if (iq >= 120) return { label: "Superior", color: "text-cyan-600", bg: "bg-cyan-50", icon: Target }
    if (iq >= 110) return { label: "Acima da Média", color: "text-green-600", bg: "bg-green-50", icon: Star }
    if (iq >= 90) return { label: "Média", color: "text-yellow-600", bg: "bg-yellow-50", icon: CheckCircle2 }
    return { label: "Abaixo da Média", color: "text-orange-600", bg: "bg-orange-50", icon: Target }
  }

  // Tela Inicial
  if (screen === "start") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-6 shadow-2xl animate-bounce-slow">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4 animate-slide-up">
              Quiz de QI
            </h1>
            <p className="text-xl text-gray-600 mb-2 animate-slide-up-delay">
              Teste seu raciocínio lógico e descubra seu QI estimado
            </p>
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2 animate-slide-up-delay-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              50 perguntas • 15-20 minutos
              <Sparkles className="w-4 h-4 text-yellow-500" />
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 animate-scale-in border-2 border-indigo-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-indigo-600" />
              Como funciona:
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3 animate-slide-right">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>50 perguntas de raciocínio lógico (fáceis, médias e difíceis)</span>
              </li>
              <li className="flex items-start gap-3 animate-slide-right-delay">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Feedback imediato após cada resposta</span>
              </li>
              <li className="flex items-start gap-3 animate-slide-right-delay-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Descubra seu QI estimado ao final</span>
              </li>
              <li className="flex items-start gap-3 animate-slide-right-delay-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Compartilhe seu resultado e desafie amigos!</span>
              </li>
            </ul>
          </div>

          {bestScore && (
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 mb-6 border-2 border-yellow-300 animate-pulse-slow shadow-lg">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-600 animate-bounce" />
                <div>
                  <p className="text-sm text-gray-600">Seu melhor resultado</p>
                  <p className="text-3xl font-bold text-gray-900">{bestScore} QI</p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setScreen("quiz")}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-5 px-6 rounded-xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 animate-pulse-glow"
          >
            <Sparkles className="w-6 h-6" />
            Iniciar Quiz Agora
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    )
  }

  // Tela de Feedback no Meio
  if (screen === "feedback") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8 animate-scale-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-6 shadow-2xl animate-bounce">
              <MessageCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Você está gostando do jogo?
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Já completou metade! Sua opinião é muito importante para nós 💜
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 border-2 border-pink-100">
            <p className="text-center text-gray-700 mb-6 text-lg">
              Clique abaixo para nos dar seu feedback e ajudar a melhorar o quiz!
            </p>
            
            <div className="space-y-4">
              <a
                href="https://forms.gle/exemplo-feedback"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
              >
                ⭐ Sim, estou adorando! Deixar feedback
              </a>
              
              <a
                href="https://forms.gle/exemplo-feedback"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
              >
                💭 Pode melhorar. Deixar sugestões
              </a>
            </div>
          </div>

          <button
            onClick={continueFeedback}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Continuar Quiz
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  // Tela do Quiz
  if (screen === "quiz") {
    const question = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100
    const isCorrect = selectedAnswer === question.correct

    const difficultyColors = {
      easy: { bg: "bg-green-100", text: "text-green-700", label: "Fácil" },
      medium: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Médio" },
      hard: { bg: "bg-red-100", text: "text-red-700", label: "Difícil" }
    }

    const diff = difficultyColors[question.difficulty as keyof typeof difficultyColors]

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header com progresso */}
          <div className="mb-8 animate-slide-down">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-indigo-600 animate-pulse" />
                <span className="text-sm font-medium text-gray-600">
                  Questão {currentQuestion + 1} de {questions.length}
                </span>
              </div>
              <span className="text-sm font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full transition-all duration-500 ease-out animate-shimmer"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Pergunta */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 mb-6 animate-scale-in border-2 border-indigo-100">
            <div className="mb-6">
              <span className={`inline-block px-4 py-2 ${diff.bg} ${diff.text} text-sm font-bold rounded-full mb-4 animate-bounce-slow`}>
                {diff.label}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-relaxed">
                {question.question}
              </h2>
            </div>

            {/* Opções */}
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const showCorrect = showFeedback && index === question.correct
                const showWrong = showFeedback && isSelected && !isCorrect

                return (
                  <button
                    key={index}
                    onClick={() => !showFeedback && handleAnswer(index)}
                    disabled={showFeedback}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 transform ${
                      showCorrect
                        ? "border-green-500 bg-green-50 scale-105 shadow-lg animate-pulse-success"
                        : showWrong
                        ? "border-red-500 bg-red-50 animate-shake"
                        : isSelected
                        ? "border-indigo-500 bg-indigo-50 scale-105 shadow-lg"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50 hover:scale-102"
                    } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer hover:shadow-md"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 text-lg">{option}</span>
                      {showCorrect && <CheckCircle2 className="w-6 h-6 text-green-500 animate-bounce" />}
                      {showWrong && <XCircle className="w-6 h-6 text-red-500 animate-spin-slow" />}
                    </div>
                  </button>
                )
              })}</div>
          </div>

          {/* Botão Próxima */}
          <button
            onClick={handleNext}
            disabled={selectedAnswer === null || showFeedback}
            className={`w-full py-5 px-6 rounded-xl font-bold text-xl shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 ${
              selectedAnswer === null || showFeedback
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-3xl hover:scale-105 animate-pulse-glow"
            }`}
          >
            {currentQuestion === questions.length - 1 ? (
              <>
                <Trophy className="w-6 h-6" />
                Ver Resultado Final
              </>
            ) : (
              <>
                Próxima Questão
                <ChevronRight className="w-6 h-6" />
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  // Tela de Resultado
  const correctAnswers = answers.filter((ans, idx) => ans === questions[idx].correct).length
  const category = getIQCategory(iqScore)
  const CategoryIcon = category.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              🎉
            </div>
          ))}
        </div>
      )}

      <div className="max-w-2xl w-full relative z-10">
        <div className="text-center mb-8 animate-scale-in">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-6 shadow-2xl animate-bounce-slow">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
            Quiz Concluído! 🎉
          </h1>
          <p className="text-gray-600 text-lg">
            Parabéns por completar todas as 50 questões!
          </p>
        </div>

        {/* Card de Resultado */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 animate-scale-in border-2 border-indigo-100">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 mb-2 flex items-center justify-center gap-2">
              <CategoryIcon className="w-5 h-5" />
              Seu QI Estimado
            </p>
            <div className="text-7xl sm:text-8xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-pulse-glow">
              {iqScore}
            </div>
            <div className={`inline-block px-6 py-3 ${category.bg} rounded-full shadow-lg animate-bounce-slow`}>
              <span className={`font-bold text-lg ${category.color} flex items-center gap-2`}>
                <CategoryIcon className="w-5 h-5" />
                {category.label}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                <p className="text-3xl font-bold text-gray-900">{correctAnswers}/{questions.length}</p>
                <p className="text-sm text-gray-600">Acertos</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                <p className="text-3xl font-bold text-gray-900">
                  {Math.round((correctAnswers / questions.length) * 100)}%
                </p>
                <p className="text-sm text-gray-600">Aproveitamento</p>
              </div>
            </div>
          </div>

          {bestScore && iqScore >= bestScore && (
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border-2 border-yellow-300 animate-pulse-slow shadow-lg">
              <div className="flex items-center justify-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-600 animate-bounce" />
                <span className="font-bold text-gray-900 text-lg">🎊 Novo Recorde Pessoal! 🎊</span>
              </div>
            </div>
          )}
        </div>

        {/* Botões de Ação */}
        <div className="space-y-4 mb-6">
          <button
            onClick={shareResult}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-5 px-6 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 animate-pulse-glow"
          >
            <Share2 className="w-6 h-6" />
            Compartilhar Resultado
          </button>

          <button
            onClick={resetQuiz}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-5 px-6 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-6 h-6" />
            Fazer Novamente
          </button>
        </div>

        {/* Informações sobre QI */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-600" />
            Entenda os níveis de QI:
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-2 rounded-lg hover:bg-purple-50 transition-colors">
              <span className="text-gray-600">140+</span>
              <span className="font-semibold text-purple-600 flex items-center gap-1">
                <Sparkles className="w-4 h-4" /> Genialidade
              </span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg hover:bg-blue-50 transition-colors">
              <span className="text-gray-600">130-139</span>
              <span className="font-semibold text-blue-600 flex items-center gap-1">
                <Zap className="w-4 h-4" /> Muito Superior
              </span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg hover:bg-cyan-50 transition-colors">
              <span className="text-gray-600">120-129</span>
              <span className="font-semibold text-cyan-600 flex items-center gap-1">
                <Target className="w-4 h-4" /> Superior
              </span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg hover:bg-green-50 transition-colors">
              <span className="text-gray-600">110-119</span>
              <span className="font-semibold text-green-600 flex items-center gap-1">
                <Star className="w-4 h-4" /> Acima da Média
              </span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg hover:bg-yellow-50 transition-colors">
              <span className="text-gray-600">90-109</span>
              <span className="font-semibold text-yellow-600">Média</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-shimmer {
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
          50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.8); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        @keyframes pulse-success {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-success {
          animation: pulse-success 0.5s;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 1s linear;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s;
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.5s;
        }
        .animate-slide-up-delay {
          animation: slide-up 0.5s 0.1s backwards;
        }
        .animate-slide-up-delay-2 {
          animation: slide-up 0.5s 0.2s backwards;
        }
        @keyframes slide-right {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-right {
          animation: slide-right 0.5s;
        }
        .animate-slide-right-delay {
          animation: slide-right 0.5s 0.1s backwards;
        }
        .animate-slide-right-delay-2 {
          animation: slide-right 0.5s 0.2s backwards;
        }
        .animate-slide-right-delay-3 {
          animation: slide-right 0.5s 0.3s backwards;
        }
        @keyframes slide-down {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down {
          animation: slide-down 0.5s;
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.5s;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  )
}
