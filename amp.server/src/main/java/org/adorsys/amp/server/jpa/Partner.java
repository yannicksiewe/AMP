package org.adorsys.amp.server.jpa;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.adorsys.amp.server.jpa.enumeration.PartnerAccreditionLevel;
import org.adorsys.amp.server.jpa.enumeration.PartnerType;


/**
 * A Partner.
 */
@Entity
public class Partner extends CoreAbstEntity {

    private static final long serialVersionUID = 1L;

    @NotNull
    @Column(name = "country", nullable = false)
    private String country;

    @NotNull
    @Column(name = "company_name", nullable = false)
    private String companyName;

    @NotNull
    @Column(name = "representant", nullable = false)
    private String representant;

    @NotNull
    @Column(name = "trade_register_nbr", nullable = false)
    private String tradeRegisterNbr;

    @Column(name = "ratepayer_nbr")
    private String ratepayerNbr;

    @Column(name = "patent")
    private String patent;

    @Column(name = "company_creation_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date companyCreationDate;

    @NotNull
    @Column(name = "business_field", nullable = false)
    private String businessField;

    @Column(name = "consular_file_nbr_ccima")
    private String consularFileNbrCCIMA;

    @Enumerated(EnumType.STRING)
    @Column(name = "partner_type")
    private PartnerType partnerType;

    @Enumerated(EnumType.STRING)
    @Column(name = "partner_accredition_level")
    private PartnerAccreditionLevel partnerAccreditionLevel;

    @Column(name = "adress")
    private String adress;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "emission_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date emissionDate;


    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getRepresentant() {
        return representant;
    }

    public void setRepresentant(String representant) {
        this.representant = representant;
    }

    public String getTradeRegisterNbr() {
        return tradeRegisterNbr;
    }

    public void setTradeRegisterNbr(String tradeRegisterNbr) {
        this.tradeRegisterNbr = tradeRegisterNbr;
    }

    public String getRatepayerNbr() {
        return ratepayerNbr;
    }

    public void setRatepayerNbr(String ratepayerNbr) {
        this.ratepayerNbr = ratepayerNbr;
    }

    public String getPatent() {
        return patent;
    }

    public void setPatent(String patent) {
        this.patent = patent;
    }

    public Date getCompanyCreationDate() {
        return companyCreationDate;
    }

    public void setCompanyCreationDate(Date companyCreationDate) {
        this.companyCreationDate = companyCreationDate;
    }

    public String getBusinessField() {
        return businessField;
    }

    public void setBusinessField(String businessField) {
        this.businessField = businessField;
    }

    public String getConsularFileNbrCCIMA() {
        return consularFileNbrCCIMA;
    }

    public void setConsularFileNbrCCIMA(String consularFileNbrCCIMA) {
        this.consularFileNbrCCIMA = consularFileNbrCCIMA;
    }

    public PartnerType getPartnerType() {
        return partnerType;
    }

    public void setPartnerType(PartnerType partnerType) {
        this.partnerType = partnerType;
    }

    public PartnerAccreditionLevel getPartnerAccreditionLevel() {
        return partnerAccreditionLevel;
    }

    public void setPartnerAccreditionLevel(PartnerAccreditionLevel partnerAccreditionLevel) {
        this.partnerAccreditionLevel = partnerAccreditionLevel;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Date getEmissionDate() {
        return emissionDate;
    }

    public void setEmissionDate(Date emissionDate) {
        this.emissionDate = emissionDate;
    }
}
