import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  ClassicEditor,
  AccessibilityHelp,
  Autoformat,
  AutoImage,
  Autosave,
  Base64UploadAdapter,
  BlockQuote,
  Bold,
  CloudServices,
  Essentials,
  Heading,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  SelectAll,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
  type EditorConfig,
} from 'ckeditor5';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconsModule } from '../../../../_icons/icons.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ArticleService } from '../../../../_services/article.service';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [CKEditorModule,IconsModule, ReactiveFormsModule, RouterModule,NgIf,NgClass],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.scss'
})
export class ArticleDetailsComponent implements OnInit{
  private activatedRoute = inject(ActivatedRoute);

  articleId: string | null = this.activatedRoute.snapshot.paramMap.get('id');
  private router = inject(Router);

  constructor(private changeDetector: ChangeDetectorRef) {}
  ngOnInit(): void {
   this.loadArticleInfo()
  }
  public Editor = ClassicEditor;
  public config: EditorConfig = {}; // CKEditor needs the DOM tree before calculating the configuration.
  public ngAfterViewInit(): void {
    this.config = {
      toolbar: {
        items: [
          'undo',
          'redo',
          '|',
          'heading',
          '|',
          'bold',
          'italic',
          'underline',
          '|',
          'link',
          'insertImage',
          // 'mediaEmbed',
          'insertTable',
          'blockQuote',
          '|',
          'bulletedList',
          'numberedList',
          'todoList',
          'outdent',
          'indent',
        ],
        shouldNotGroupWhenFull: false,
      },
      plugins: [
        AccessibilityHelp,
        Autoformat,
        AutoImage,
        Autosave,
        Base64UploadAdapter,
        BlockQuote,
        Bold,
        CloudServices,
        Essentials,
        Heading,
        ImageBlock,
        ImageCaption,
        ImageInline,
        ImageInsert,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        Italic,
        Link,
        LinkImage,
        List,
        ListProperties,
        MediaEmbed,
        Paragraph,
        PasteFromOffice,
        SelectAll,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextTransformation,
        TodoList,
        Underline,
        Undo,
      ],
      heading: {
        options: [
          {
            model: 'paragraph',
            title: 'Paragraph',
            class: 'ck-heading_paragraph',
          },
          {
            model: 'heading1',
            view: 'h1',
            title: 'Heading 1',
            class: 'ck-heading_heading1',
          },
          {
            model: 'heading2',
            view: 'h2',
            title: 'Heading 2',
            class: 'ck-heading_heading2',
          },
          {
            model: 'heading3',
            view: 'h3',
            title: 'Heading 3',
            class: 'ck-heading_heading3',
          },
          {
            model: 'heading4',
            view: 'h4',
            title: 'Heading 4',
            class: 'ck-heading_heading4',
          },
          {
            model: 'heading5',
            view: 'h5',
            title: 'Heading 5',
            class: 'ck-heading_heading5',
          },
          {
            model: 'heading6',
            view: 'h6',
            title: 'Heading 6',
            class: 'ck-heading_heading6',
          },
        ],
      },
      image: {
        toolbar: [
          'toggleImageCaption',
          'imageTextAlternative',
          '|',
          'imageStyle:inline',
          'imageStyle:wrapText',
          'imageStyle:breakText',
          '|',
          'resizeImage',
        ],
      },
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
          toggleDownloadable: {
            mode: 'manual',
            label: 'Downloadable',
            attributes: {
              download: 'file',
            },
          },
        },
      },
      list: {
        properties: {
          styles: true,
          startIndex: true,
          reversed: true,
        },
      },
      placeholder: 'Type or paste your content here!',
      table: {
        contentToolbar: [
          'tableColumn',
          'tableRow',
          'mergeTableCells',
          'tableProperties',
          'tableCellProperties',
        ],
      },
    };

    this.isLayoutReady = true;
    this.changeDetector.detectChanges();
  }
  public isLayoutReady = false;
  oldImageUrl: string ='';
  imageUrl: string ='';
  fileToUpload: any;

  handleFileInput(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileToUpload = input.files[0];

      //Show image preview
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      };
      reader.readAsDataURL(this.fileToUpload);
    }
  }


  public model = {
    editorData: '',
  };

  articleService = inject(ArticleService);
  articleForm = new FormGroup({
    title: new FormControl('', Validators.required),
    autor: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  loadArticleInfo() {
    if (this.articleId) {
      this.articleService.getArticle(this.articleId).subscribe((res) => {
        this.articleForm = new FormGroup({
          title: new FormControl(`${res.title}`, Validators.required),
          autor: new FormControl(`${res.autor}`, Validators.required),
          content: new FormControl(`${res.content}`, Validators.required),
        });
        this.oldImageUrl=`${environment.baseUrl}uploads/${res.image}`
        this.imageUrl=this.oldImageUrl
        // console.log(this.imageUrl);

      });
    }
  }

  onSubmit(){
    if (this.articleId) {
      this.articleService
        .updateArticle(this.articleForm.value, this.articleId,this.fileToUpload as File)
        .subscribe(() => {
          this.loadArticleInfo()
          // console.log(this.imageUrl);
          
        });
    }
  }

}
