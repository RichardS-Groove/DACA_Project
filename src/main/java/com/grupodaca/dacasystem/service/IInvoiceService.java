package com.grupodaca.dacasystem.service;

import com.grupodaca.dacasystem.dto.request.CustomerRequestDTO;
import com.grupodaca.dacasystem.dto.request.InvoiceRequestDTO;
import com.grupodaca.dacasystem.dto.response.CustomerListResponseDTO;
import com.grupodaca.dacasystem.dto.response.InvoiceListResponseDTO;

public interface IInvoiceService {

    Long addInvoice(InvoiceRequestDTO invoiceRequestDTO);

    InvoiceListResponseDTO invoiceList();

    void deleteInvoice(long id);

    long updateInvoice(long id, InvoiceRequestDTO invoiceRequestDTO);

}
