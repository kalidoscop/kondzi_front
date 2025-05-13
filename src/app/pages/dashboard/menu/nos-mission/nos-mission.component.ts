import { isPlatformBrowser, NgIf } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PageService } from '../../../../_services/page.service';

@Component({
  selector: 'app-nos-mission',
  standalone: true,
  imports: [CKEditorModule, FormsModule, NgIf],
  templateUrl: './nos-mission.component.html',
  styleUrl: './nos-mission.component.scss',
})
export class NosMissionComponent implements OnInit {
  isBrowser = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  public model = {
    editorData: '',
  };
  ngOnInit(): void {
    this.getPageContent();
  }

  public isLayoutReady = false;
  pageService = inject(PageService);

  public Editor : any=null;
  public config: any = {}; // CKEditor needs the DOM tree before calculating the configuration.
  public ngAfterViewInit(): void {
    this.loadCkeditor();
  }
  async loadCkeditor() {
    const {
      ClassicEditor,
      AccessibilityHelp,
      Autoformat,
      AutoImage,
      Autosave,
      Alignment,
      Base64UploadAdapter,
      BlockQuote,
      Bold,
      CloudServices,
      Essentials,
      Font,
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
    } = await import('ckeditor5');
    // import { CKEditorModule } from ;

    this.Editor = ClassicEditor;

    this.config = {
      toolbar: {
        items: [
          'undo',
          'redo',
          '|',
          'heading',
          '|',
          'fontSize',
          'fontFamily',
          'fontColor',
          'fontBackgroundColor',
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
          'alignment',
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
        Font,
        Alignment,
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
  // contenu: string = ''; // Contenu de la page
  // container:HTMLElement|string = document.getElementById('editor');

  // quill = new Quill(this.container);
  // public editorData = '<p>Hello, world!</p>';
  public async getPageContent() {
    this.pageService.getPage(this.pageName).subscribe((res) => {
      this.model.editorData = res.page;
    });
  }

  async onsubmit() {
    console.log('coucou');

    switch (this.pageName) {
      case 'qui-sommes-nous':
        this.pageService
          .changPage({ quiSommesNous: this.model.editorData })
          .subscribe(() => this.getPageContent());
        break;
      case 'nos-mission':
        this.pageService
          .changPage({ nosMission: this.model.editorData })
          .subscribe(() => this.getPageContent());
        break;
      case 'nos-partenaires':
        this.pageService
          .changPage({ nosPartenaires: this.model.editorData })
          .subscribe(() => this.getPageContent());
        break;
      case 'actualites-sante':
        this.pageService
          .changPage({ actualitesSante: this.model.editorData })
          .subscribe(() => this.getPageContent());
        break;
      case 'repertoires-adresses-geolocalisees':
        this.pageService
          .changPage({
            repertoiresAdressesGeolocalisees: this.model.editorData,
          })
          .subscribe(() => this.getPageContent());
        break;
      case 'bien-etre-infos-utiles':
        this.pageService
          .changPage({ bienEtreInfosUtiles: this.model.editorData })
          .subscribe(() => this.getPageContent());
        break;
      case 'accessibilite-conformite-partielle':
        this.pageService
          .changPage({
            accessibiliteConformitePartielle: this.model.editorData,
          })
          .subscribe(() => this.getPageContent());
        break;
      case 'conditions-generales-utilisation':
        this.pageService
          .changPage({ conditionsGeneralesUtilisation: this.model.editorData })
          .subscribe(() => this.getPageContent());
        break;
      case 'mentions-legales':
        this.pageService
          .changPage({ mentionsLegales: this.model.editorData })
          .subscribe(() => this.getPageContent());
        break;
      case 'politique-de-confidentialite':
        this.pageService
          .changPage({ politiqueDeConfidentialite: this.model.editorData })
          .subscribe(() => this.getPageContent());
        break;
      case 'media-sante':
        this.pageService
          .changPage({ mediaSante: this.model.editorData })
          .subscribe(() => this.getPageContent());
        break;
      case 'urgence':
        this.pageService
          .changPage({ urgence: this.model.editorData })
          .subscribe(() => this.getPageContent());
        break;

      default:
        break;
    }

    // const data = await this.editor.save();
    // console.log(data);
  }
  public pageName: string = 'qui-sommes-nous';
  getPage() {
    this.getPageContent();
  }
}
