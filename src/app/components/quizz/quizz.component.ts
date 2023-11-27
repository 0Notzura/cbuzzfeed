import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import quizz_questions from '../../../assets/data/questions.json'

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {
  title:string='title'
  questions:any
  questionSelected:any
  answers:string[]=[]
  answerSelected:string=''
  questionIndex:number=0
  questionMax:number=0
  finished:boolean=false
  ngOnInit() :void{
    if(quizz_questions){
      this.finished=false
      this.title=quizz_questions.title
      this.questions=quizz_questions.questions
      this.questionSelected=quizz_questions.questions[0]
      this.questionMax=this.questions.length
    }
  }
  playerChoice(value:string){
    this.answers.push(value)    
    this.nextStep()
  }
  async nextStep(){
    this.questionIndex++
    if(this.questionMax>this.questionIndex){
      this.questionSelected=this.questions[this.questionIndex]
    }
    else{
      const finalAnswer:string=await this.checkResults(this.answers)
      this.finished=true
      this.answerSelected=quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
      console.log(this.answers)
    }
  }
  async checkResults(answers:string[]){    
    const result=answers.reduce((previous,current,index,arr)=>{
      if(arr.filter(item=>item===previous).length>arr.filter(item=>item===current).length){
        return previous
      }
      else{
        return current
      }
    })
    return result
  }
}
