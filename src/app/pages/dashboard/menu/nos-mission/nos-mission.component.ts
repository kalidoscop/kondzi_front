import { Component } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import {
//   Autoformat,
//   BlockQuote,
//   Bold,
//   ClassicEditor,
//   CloudServices,
//   Essentials,
//   Heading,
//   Indent,
//   IndentBlock,
//   Italic,
//   Link,
//   List,
//   Mention,
//   Paragraph,
//   PasteFromOffice,
//   Table,
//   TableColumnResize,
//   TableToolbar,
//   TextTransformation,
//   Underline,
//   Undo,
// } from 'ckeditor5';
import EditorJS from '@editorjs/editorjs';
import  Header  from  '@editorjs/header' ; 
 import  List  from  '@editorjs/list' ; 


@Component({
  selector: 'app-nos-mission',
  standalone: true,
  imports: [CKEditorModule],
  templateUrl: './nos-mission.component.html',
  styleUrl: './nos-mission.component.scss',
})
export class NosMissionComponent {
//   public Editor = ClassicEditor;
//   public config = {
//     toolbar: [
//       'undo',
// 			'redo',
// 			'|',
// 			'heading',
// 			'|',
// 			'bold',
// 			'italic',
// 			'underline',
// 			'|',
// 			'link',
// 			'uploadImage',
// 			'ckbox',
// 			'insertTable',
// 			'blockQuote',
// 			'mediaEmbed',
// 			'|',
// 			'bulletedList',
// 			'numberedList',
// 			'|',
// 			'outdent',
// 			'indent',
//     ],
//     // heading: {
// 		// 	options: [
// 		// 		{
// 		// 			model: 'paragraph',
// 		// 			title: 'Paragraph',
// 		// 			class: 'ck-heading_paragraph',
// 		// 		},
// 		// 		{
// 		// 			model: 'heading1',
// 		// 			view: 'h1',
// 		// 			title: 'Heading 1',
// 		// 			class: 'ck-heading_heading1',
// 		// 		},
// 		// 		{
// 		// 			model: 'heading2',
// 		// 			view: 'h2',
// 		// 			title: 'Heading 2',
// 		// 			class: 'ck-heading_heading2',
// 		// 		},
// 		// 		{
// 		// 			model: 'heading3',
// 		// 			view: 'h3',
// 		// 			title: 'Heading 3',
// 		// 			class: 'ck-heading_heading3',
// 		// 		},
// 		// 		{
// 		// 			model: 'heading4',
// 		// 			view: 'h4',
// 		// 			title: 'Heading 4',
// 		// 			class: 'ck-heading_heading4',
// 		// 		},
// 		// 	],
// 		// },
//     plugins: [
//       Autoformat,
// 			BlockQuote,
// 			Bold,
// 			CloudServices,
// 			// ...(CKBOX_TOKEN_URL ? [CKBox] : []),
// 			Essentials,
// 			Heading,
// 			// Image,
// 			// ImageCaption,
// 			// ImageResize,
// 			// ImageStyle,
// 			// ImageToolbar,
// 			// ImageUpload,
// 			// Base64UploadAdapter,
// 			Indent,
// 			IndentBlock,
// 			Italic,
// 			Link,
// 			List,
// 			// MediaEmbed,
// 			Mention,
// 			Paragraph,
// 			PasteFromOffice,
// 			// PictureEditing,
// 			Table,
// 			TableColumnResize,
// 			TableToolbar,
// 			TextTransformation,
// 			Underline,
// 			// ...(LICENSE_KEY ? [SlashCommand] : []),
//     ]
//   };
public editor = new  EditorJS ({ 
	
	/** * Id de l'élément qui doit contenir l'éditeur */  
   holder : 'editorjs' , 
   
	/** * Liste des outils disponibles. * Transmettez la classe de l'outil ou l'objet Paramètres pour chaque outil que vous souhaitez utiliser */  
   tools : { 
	  header : Header , 
	  list : List  
   }, })


   async onsubmit(){
	console.log('coucou');
	
	const data =  await this.editor.save()
	   console.log(data);
	   
   }

}
