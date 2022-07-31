package com.grupodaca.dacasystem.service;

import com.grupodaca.dacasystem.dto.request.CustomerRequestDTO;
import com.grupodaca.dacasystem.dto.request.InvoiceRequestDTO;
import com.grupodaca.dacasystem.dto.response.CustomerListResponseDTO;
import com.grupodaca.dacasystem.dto.response.CustomerResponseDTO;
import com.grupodaca.dacasystem.dto.response.InvoiceListResponseDTO;
import com.grupodaca.dacasystem.dto.response.InvoiceResponseDTO;
import com.grupodaca.dacasystem.entity.Customer;
import com.grupodaca.dacasystem.entity.Invoice;
import com.grupodaca.dacasystem.repository.InvoiceRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class InvoiceService implements IInvoiceService{

    @Autowired
    InvoiceRepository invoiceRepository;

    ModelMapper mapper = new ModelMapper();

    @Override
    public Long addInvoice(InvoiceRequestDTO invoiceRequestDTO) {

        Invoice invoice = mapper.map(invoiceRequestDTO, Invoice.class);

        invoice = invoiceRepository.save(
                invoice
        );

        return invoice.getId();
    }

    @Override
    public InvoiceListResponseDTO invoiceList() {
        List<Invoice> invoiceList = invoiceRepository.findAll();

        return new InvoiceListResponseDTO(
                invoiceList.stream().map(
                        invoice -> mapper.map(invoice, InvoiceResponseDTO.class)
                ).collect(Collectors.toList())
        );
    }

    @Override
    public void deleteInvoice(long id) {
        invoiceRepository.deleteById(id);
    }

    @Override
    public long updateInvoice(long id, InvoiceRequestDTO invoiceRequestDTO) {

        Invoice invoice = invoiceRepository.findInvoiceById(id);

        invoice.setInvoiceNumber(invoiceRequestDTO.getInvoiceNumber());
        invoice.setDateOfIssue(invoiceRequestDTO.getDateOfIssue());
        invoice.setType(invoiceRequestDTO.getType());
        invoice.setCustomer(invoiceRequestDTO.getCustomer());
        invoice.setSaleCondition(invoiceRequestDTO.getSaleCondition());
        invoice.setStatus(invoiceRequestDTO.getStatus());
        invoice.setPurchaseOrder(invoiceRequestDTO.getPurchaseOrder());
        invoice.setInvoiceAmount(invoiceRequestDTO.getInvoiceAmount());
        invoice.setIva(invoiceRequestDTO.getIva());

        return invoiceRequestDTO.getId();

    }
}
