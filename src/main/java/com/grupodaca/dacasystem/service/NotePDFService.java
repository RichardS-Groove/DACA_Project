package com.grupodaca.dacasystem.service;

import com.grupodaca.dacasystem.entity.GrupoDacaData;
import com.grupodaca.dacasystem.entity.Note;
import com.grupodaca.dacasystem.repository.NoteRepository;
import com.lowagie.text.*;
import com.lowagie.text.alignment.HorizontalAlignment;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Service
public class NotePDFService {

    @Autowired
    NoteRepository noteRepository;


    public void export(HttpServletResponse response,long id) throws IOException {

        Note myNote = noteRepository.findNoteById(id);

        GrupoDacaData datosComerciales = new GrupoDacaData();
        Document remito = new Document(PageSize.A4);
        PdfWriter.getInstance(remito,response.getOutputStream());

        Font fontGigante = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        fontGigante.setSize(30);
        Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        fontTitle.setSize(12);
        Font fontLittleLess = FontFactory.getFont(FontFactory.HELVETICA);
        fontLittleLess.setSize(9);
        Font fontLittle = FontFactory.getFont(FontFactory.HELVETICA);
        fontLittle.setSize(7);

        Paragraph rSocial = new Paragraph(datosComerciales.getRazonSocial(),fontTitle);
        rSocial.setAlignment(Paragraph.ALIGN_CENTER);
        Paragraph direccion = new Paragraph(datosComerciales.getDireccion(),fontLittle);
        Paragraph localidad = new Paragraph(datosComerciales.getLocalidad()+" - "+datosComerciales.getProvincia(),fontLittle);
        Paragraph condIva = new Paragraph(datosComerciales.getCondIva(),fontLittle);
        Paragraph nule = new Paragraph(".",fontLittle);

        Paragraph superR = new Paragraph("R",fontGigante);


        Image logo = Image.getInstance("src/main/resources/static/img/x2.png");

        Table tableHeader = new Table(3,1);
        Cell cell = new Cell();
        cell.add(logo);
        cell.add(rSocial);
        cell.add(direccion);
        cell.add(localidad);
        cell.add(condIva);
        cell.setWidth(35);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setVerticalAlignment(Element.ALIGN_CENTER);
        cell.setBorder(0);
        tableHeader.addCell(cell);

        Cell cell2 = new Cell();
        cell2.add(superR);
        cell2.setWidth(15);
        cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell2.setBorder(0);

        tableHeader.addCell(cell2);

        Cell cell3 = new Cell();
        cell3.add(new Paragraph("REMITO Nº: "+myNote.getNoteNumber(),fontTitle));
        cell3.add(new Paragraph("FECHA: "+ myNote.getDateOfIssue().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")).toString(),fontLittleLess));
        cell3.setWidth(15);
        cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
        cell3.setBorder(0);

        tableHeader.addCell(cell3);

        float[] columnsWidths = new float[]{60, 30, 60};

        tableHeader.setPadding(5);
        tableHeader.setWidths(columnsWidths);
        tableHeader.setWidth(100);

        Table tableHeader2 = new Table(2,1);

        Cell cell11 = new Cell(new Paragraph("Señor(es): "+myNote.getProject().getCustomer().getBusinessName(),fontLittleLess));
        cell11.add(new Paragraph("Domicilio: "+myNote.getProject().getAddress(),fontLittleLess));
        tableHeader2.addCell(cell11);

        Cell cell21 = new Cell(new Paragraph("Obra: "+myNote.getProject().getName(),fontLittleLess));
        cell21.add(new Paragraph("CP: 1832",fontLittleLess));
        tableHeader2.addCell(cell21);

        float[] columnsWidths2 = new float[]{75, 75};
        tableHeader2.setPadding(5);
        tableHeader2.setWidths(columnsWidths2);
        tableHeader2.setWidth(100);

        Table tableHeader3 = new Table(3,1);
        Cell cell31 = new Cell(new Paragraph("IVA",fontTitle));
        cell31.setHorizontalAlignment(Element.ALIGN_CENTER);
        Cell cell32 = new Cell(new Paragraph("Condición frente al IVA: "+myNote.getIVACondition(),fontLittleLess));
        Cell cell33 = new Cell(new Paragraph("CUIT: "+myNote.getProject().getCustomer().getCuit(),fontLittleLess));
        float[] columnsWidths3 = new float[]{20, 65, 65};
        tableHeader3.addCell(cell31);
        tableHeader3.addCell(cell32);
        tableHeader3.addCell(cell33);
        tableHeader3.setPadding(5);
        tableHeader3.setWidths(columnsWidths3);
        tableHeader3.setWidth(100);

        Table tableHeader4 = new Table(2,1);
        Cell cell41 = new Cell(new Paragraph("CONDICION DE VENTA: "+myNote.getSaleCondition().toUpperCase(Locale.ROOT),fontTitle));
        Cell cell42 = new Cell(new Paragraph("Factura N°: "+myNote.getInvoice(),fontLittleLess));
        float[] columnsWidths4 = new float[]{85, 65};
        tableHeader4.addCell(cell41);
        tableHeader4.addCell(cell42);
        tableHeader4.setPadding(5);
        tableHeader4.setWidths(columnsWidths4);
        tableHeader4.setWidth(100);

        Table tableHeader5 = new Table(2,1);
        Cell cell51 = new Cell(new Paragraph("CANTIDAD:",fontLittleLess));
        Cell cell52 = new Cell(new Paragraph("DESCRIPCION",fontLittleLess));
        cell52.setHorizontalAlignment(Element.ALIGN_CENTER);
        tableHeader5.addCell(cell51);
        tableHeader5.addCell(cell52);
        float[] columnsWidths5 = new float[]{20, 130};

        tableHeader5.setPadding(5);
        tableHeader5.setWidths(columnsWidths5);
        tableHeader5.setWidth(100);

        Table tableSpace = new Table(1,1);
        Cell vacia = new Cell(new Paragraph("\n",fontLittle));
        vacia.setBorder(0);
        tableSpace.addCell(vacia);
        tableSpace.setBorder(0);



        Table tableHeaderF = new Table(2,1);
        Paragraph footer = new Paragraph("TRANSPORTISTA:",fontLittleLess);
        Paragraph footer2 = new Paragraph("DOMICILIO:",fontLittleLess);
        Paragraph footer3 = new Paragraph("LOCALIDAD:",fontLittleLess);
        Paragraph footer4 = new Paragraph("CUIT",fontLittleLess);
        Cell cell61 = new Cell();
        cell61.add(footer);
        cell61.add(footer2);
        cell61.add(footer3);
        cell61.add(footer4);
        tableHeaderF.addCell(cell61);
        Paragraph footer1 = new Paragraph("RECIBI CONFIRME:",fontLittleLess);
        Paragraph footer11 = new Paragraph("\n",fontLittleLess);
        Paragraph footer12 = new Paragraph("FIRMA:______________________________",fontLittleLess);
        Paragraph footer13 = new Paragraph("ACLARACION:_________________________",fontLittleLess);
        Cell cell62 = new Cell();
        cell62.add(footer1);
        cell62.add(footer11);
        cell62.add(footer12);
        cell62.add(footer11);
        cell62.add(footer13);
        cell62.setHorizontalAlignment(Element.ALIGN_CENTER);
        tableHeaderF.addCell(cell62);





        float[] columnsWidthsF = new float[]{75, 75};

        tableHeaderF.setPadding(5);
        tableHeaderF.setWidths(columnsWidthsF);
        tableHeaderF.setWidth(100);

        remito.open();

        remito.add(tableHeader);
        remito.add(tableHeader2);
        remito.add(tableHeader3);
        remito.add(tableHeader4);
        remito.add(tableSpace);
        remito.add(tableHeader5);


        for (int i = 0; i < myNote.getItemsList().size(); i++) {
            Table tableHeaderN = new Table(2,1);
            Cell cellN = new Cell(new Paragraph(String.valueOf(myNote.getItemsList().get(i).getQuantity()),fontLittleLess));
            Cell cellN2 = new Cell(new Paragraph(myNote.getItemsList().get(i).getDescription(),fontLittleLess));
            cellN.setHorizontalAlignment(HorizontalAlignment.CENTER);
            tableHeaderN.addCell(cellN);
            tableHeaderN.addCell(cellN2);
            float[] columnsWidthsN = new float[]{20, 130};

            tableHeaderN.setPadding(5);
            tableHeaderN.setWidths(columnsWidthsN);
            tableHeaderN.setWidth(100);

            remito.add(tableHeaderN);
        }
        for (int i = 0; i < (14-myNote.getItemsList().size()); i++) {
            Table tableHeaderEmpty = new Table(2,1);
            Cell cellN = new Cell(new Paragraph("\n",fontLittleLess));
            Cell cellN2 = new Cell(new Paragraph("\n",fontLittleLess));
            tableHeaderEmpty.addCell(cellN);
            tableHeaderEmpty.addCell(cellN2);
            float[] columnsWidthsN = new float[]{20, 130};

            tableHeaderEmpty.setPadding(5);
            tableHeaderEmpty.setWidths(columnsWidthsN);
            tableHeaderEmpty.setWidth(100);

            remito.add(tableHeaderEmpty);
        }

        remito.add(tableHeaderF);



        remito.close();

    }
}

